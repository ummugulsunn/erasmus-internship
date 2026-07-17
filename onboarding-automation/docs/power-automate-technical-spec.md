# Onboarding Email Sequence — Teknik Dokümantasyon

**Sistem:** Microsoft Lists + Power Automate (Scheduled Cloud Flow)
**Amaç:** Yeni işe başlayan çalışanlara, başlangıç tarihlerinde otomatik olarak markalı bir onboarding e-postası göndermek — IT onayı veya özel Azure App Registration gerektirmeden.

---

## 1. Genel Mimari

- Kaynak veri: **Microsoft List** ("Employee Onboarding Tracker")
- Otomasyon: **Power Automate** flow'u ("Onboarding Email Sequence"), her gün bir kez çalışır
- Gönderim: **Office 365 Outlook** bağlayıcısı ("Send an email (V2)") — kişisel Outlook hesabı üzerinden, native/standart bağlayıcı (Premium değil, ek lisans gerektirmez)
- Mükerrer gönderim koruması: Listede tutulan `Day1Sent` boolean alanı

---

## 2. Microsoft List Yapısı

**Liste adı:** `Employee Onboarding Tracker`
**Konum:** "My lists" (kişisel site) — `https://netorgft11981164-my.sharepoint.com/personal/ummuguslun_turkmen_apollo-gs_com`

| Kolon (Görünen Ad) | Internal Adı | Veri Tipi | Notlar |
|---|---|---|---|
| Name | **Title** | Single line of text | Listenin varsayılan "Title" kolonu yeniden adlandırıldı. Görünen ad "Name" olsa da, tüm formül/dinamik içerik referanslarında internal ad olan **Title** kullanılmalı. |
| Role | Role | Single line of text | |
| Department | Department | Single line of text | |
| Manager | Manager | Single line of text | |
| StartDate | StartDate | Date and time | Format: "Date only" olarak ayarlandı (saat bileşeni yok) |
| NewHireEmail | NewHireEmail | Single line of text | Bilerek "Person" tipi **kullanılmadı** — yeni işe alınan kişinin henüz M365 hesabı olmayabilir |
| Day1Sent | Day1Sent | Yes/No | Varsayılan: No. Flow tarafından e-posta gönderildikten sonra otomatik Yes'e çevrilir |
| Day3Sent | Day3Sent | Yes/No | **Şu an kullanılmıyor** — bkz. Bölüm 5 |
| Week1Sent | Week1Sent | Yes/No | **Şu an kullanılmıyor** — bkz. Bölüm 5 |

---

## 3. Power Automate Flow Yapısı

**Flow adı:** `Onboarding Email Sequence`
**Tetikleyici tipi:** Scheduled Cloud Flow (Recurrence)

### 3.1 — Recurrence (Tetikleyici)
- Interval: `1`
- Frequency: `Day`
- Time Zone: Kullanıcının yerel saat dilimi (açıkça ayarlanmalı — UTC'de bırakılmamalı, gün sınırındaki karşılaştırma hatalarını önlemek için)

### 3.2 — Öğeleri al (Get items)
**Bağlayıcı:** SharePoint

| Parametre | Değer |
|---|---|
| Site Adresi | `https://netorgft11981164-my.sharepoint.com/personal/ummuguslun_turkmen_apollo-gs_com` |
| Liste Adı | `Employee Onboarding Tracker` |
| Filter Query | `Week1Sent eq 0` |

> **Not:** Site Adresi alanına bir "paylaşım bağlantısı" (`:l:/g/...` formatında, token'lı URL) değil, düz site kök adresi girilmelidir. Dropdown/picker kişisel siteleri her zaman otomatik bulamayabiliyor — bu durumda alanlara doğrudan metin olarak yazmak (Site Adresi ve Liste Adı) işe yarıyor.
>
> Filter Query neden sadece `Week1Sent eq 0`: Week1Sent, kronolojik olarak en son işaretlenecek alan olduğu için, bu tek koşul "hâlâ gönderilmemiş bir şeyi olan" tüm satırları kapsar.

### 3.3 — Her birine uygula (Apply to each)
- Input: `Öğeleri al` adımının **value** çıktısı (`body/value`)

### 3.4 — Koşul ("Koşul" — Day 1 kontrolü)
**Condition expression:**
```
and(
  lessOrEquals(item()?['StartDate'], utcNow()),
  equals(item()?['Day1Sent'], false)
)
```
> Bu ifade kasıtlı olarak "tam olarak bugün" yerine "başlangıç tarihi geldi veya geçti VE henüz gönderilmedi" mantığıyla yazıldı — flow bir gün çalışmazsa (hafta sonu, kesinti vb.) bir sonraki çalıştırmada otomatik telafi eder.

#### Doğru (True) dalı:

**a) Oluştur (Compose)** — tam HTML e-posta şablonunu, aşağıdaki dinamik alanlar/formüllerle birlikte üretir (bkz. Bölüm 4).

**b) E-posta gönder (V2)** — Bağlayıcı: Office 365 Outlook
| Alan | Değer |
|---|---|
| Bitiş (To) | `NewHireEmail` (dinamik içerik) |
| Konu (Subject) | `Welcome to Apollo Green Solutions — Your Onboarding Guide.` (statik metin) |
| Gövde (Body) | `Oluştur` adımının çıktısı — **hiçbir sarmalayıcı etiket olmadan** (bkz. Bölüm 6, rich-text editor uyarısı) |

**c) Öğeyi güncelleştir (Update item)** — Bağlayıcı: SharePoint
| Parametre | Değer |
|---|---|
| Site Adresi | Get items ile aynı |
| Liste Adı | Get items ile aynı |
| Kimlik (Id) | Geçerli döngü öğesinin ID'si (dinamik içerik) |
| **Değiştirilen tek kolon** | `Day1Sent = Evet (true)` |

> **Kritik nokta:** Bu Update item aksiyonu **yalnızca** `Day1Sent` alanını içermeli. `Day3Sent` ve `Week1Sent` bu aksiyona **eklenmemeli** (parametre listesinden kaldırılmalı) — aksi halde her Day-1 gönderiminde bu iki alan sıfırlanır/ezilir, bu da ileride mükerrer gönderim riskine yol açar.

#### Yanlış (False) dalı: Boş (hiçbir aksiyon yok)

### 3.5 — Kullanılmayan Koşullar: "Koşul 1" ve "Koşul 2"

Flow içinde, "Koşul"dan sonra sırayla iki koşul daha bulunuyor — bunlar başlangıçta bir Day 3 / Week 1 çok dokunuşlu (multi-touch) e-posta dizisi için hazırlanmıştı, ancak **tek bir kapsamlı Day-1 e-postasının yeterli olduğuna karar verildiği için içleri boş bırakıldı.**

**Koşul 1 (Day 3 — kullanılmıyor):**
```
and(
  greaterOrEquals(utcNow(), addDays(item()?['StartDate'], 3)),
  equals(item()?['Day3Sent'], false)
)
```

**Koşul 2 (Week 1 — kullanılmıyor):**
```
and(
  greaterOrEquals(utcNow(), addDays(item()?['StartDate'], 7)),
  equals(item()?['Week1Sent'], false)
)
```

Her ikisinin de Doğru/Yanlış dallarında hiçbir aksiyon yok — bu yüzden hangi sonucu verirlerse versinler flow'un davranışını etkilemezler. İleride tekrar bir çok-aşamalı diziye geçilmek istenirse, bu iskelet zaten hazır durumda.

---

## 4. Compose Aksiyonundaki Dinamik Alanlar ve Formüller

Aşağıdaki tüm ifadeler "Oluştur" (Compose) aksiyonu içinde, HTML şablonundaki `{{TOKEN}}` yer tutucularının yerine eklendi:

| Yer Tutucu | Kaynak / Formül |
|---|---|
| `{{NAME}}` | **Title** (dinamik içerik — 2 yerde kullanıldı) |
| `{{ROLE}}` | **Role** (dinamik içerik) |
| `{{DEPARTMENT}}` | **Department** (dinamik içerik — 2 yerde kullanıldı) |
| `{{START_DATE}}` | **StartDate** (dinamik içerik, ham ISO formatında — isteğe bağlı iyileştirme aşağıda) |
| `{{MANAGER}}` | **Manager** (dinamik içerik — 4 yerde kullanıldı) |
| `{{MANAGER_EMAIL}}` | `concat(toLower(replace(item()?['Manager'], ' ', '.')), '@apollo-gs.com')` |
| `{{DAY1_DATE}}` | `formatDateTime(item()?['StartDate'], 'MMM d')` |
| `{{DAY2_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 1), 'MMM d')` |
| `{{DAY3_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 2), 'MMM d')` |
| `{{DAY4_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 3), 'MMM d')` |
| `{{DAY5_DATE}}` | `formatDateTime(addDays(item()?['StartDate'], 4), 'MMM d')` |

**İsteğe bağlı iyileştirme (henüz uygulanmadı):** `{{START_DATE}}` alanı şu an ham `StartDate` değerini (ör. "2026-07-16") basıyor. Daha okunaklı olması için:
```
formatDateTime(items('Her_birine_uygula')?['StartDate'], 'MMMM d, yyyy')
```
kullanılabilir (ör. "July 16, 2026").

---

## 5. Bilinen Notlar / Karşılaşılan Sorunlar

- **Site Adresi hatası ("We didn't find a site with this address"):** Bu, bir paylaşım bağlantısı (sharing link) yapıştırıldığında oluşur. Çözüm: gerçek site kök adresini kullanmak.
- **GetTable şema uyarısı:** "Get items" aksiyonunda bazen bir OpenAPI şema algılama uyarısı çıkabilir (`status code 200 does not contain a valid OpenAPI schema object`). Bu **kozmetiktir** — gerçek veri bağlantısı çalışmaya devam eder, sadece dinamik içerik önerileri (tokens) tam gelmeyebilir; bu durumda alanlar **fx** (expression) ile manuel yazılabilir.
- **Send an email (V2) — Gövde alanı zengin metin editörü:** Bu alan varsayılan olarak bir rich-text editördür ve içine eklenen dinamik içeriği otomatik olarak `<p>` etiketleriyle sarmalayabilir. Çözüm: **"</>"** (kod görünümü) simgesine tıklayıp, eklenen token'ın etrafındaki tüm `<p>`/`</p>` kalıntılarını manuel silmek — alanda yalnızca çıplak token kalmalı.
- **"Öğeyi güncelleştir" alanları:** Her Update item aksiyonu, **yalnızca ilgili tek alanı** içermeli (Day1 dalı → sadece Day1Sent, ileride Day3/Week1 dalları eklenirse sadece kendi alanları). Diğer Sent alanları asla bu aksiyona dahil edilmemeli.
- **Logo görseli:** Şablondaki `<img src="https://www.apollo-gs.com/logo.png">` şu anda gerçek bir görsele işaret etmiyor (broken image). Gerçek, canlı bir logo URL'si ile değiştirilmesi gerekiyor.
- **Lisans/Maliyet:** SharePoint ve Office 365 Outlook bağlayıcıları **Standard** tier'dadır — Microsoft 365 iş planlarına dahildir, ek Power Automate lisansı veya Premium bağlayıcı maliyeti gerektirmez.

---

## 6. Test Sonuçları (Doğrulandı)

- İlk çalıştırma: Test satırı için e-posta başarıyla gönderildi, tüm dinamik alanlar doğru şekilde dolduruldu, `Day1Sent` otomatik olarak "Yes" oldu.
- İkinci çalıştırma (aynı gün): `Day1Sent` artık "Yes" olduğu için "Koşul" **Yanlış** sonucunu verdi, Doğru dalındaki tüm aksiyonlar (Oluştur, E-posta gönder, Öğeyi güncelleştir) **atlandı (skipped)** — mükerrer gönderim koruması doğrulandı.
