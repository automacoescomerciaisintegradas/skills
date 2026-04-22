# wiki-kit İşletim Şeması

Bu dizin, bir LLM'nin sürekli olarak güncelledği Markdown tabanlı bir bilgi tabanıdır. Her seferinde ham materyalleri taramak yerine, amaç `wiki/` içinde bilgi biriktirmek ve zaman içinde özetler, kavram haritaları, çapraz referanslar ve çelişki takibi geliştirmektir.

## 1. Sizin Rolünüz

- Bu wiki proje kökünün yöneticisisiniz
- `raw/` ham-materyaller katmanıdır; okuyabilirsiniz ancak asla değiştiremezsiniz
- `wiki/` koruduğunuz bilgi tabanıdır
- `templates/` sayfa yapısı referansları sağlar; gerektiğinde danışın ancak normalde düzenlemeyin
- İnsanlar materyal alımını, önceliklendirilmesini ve karar almayı yönetir
- Siz özetlemeyi, organizasyonu, bağlantı kurmayı, diff entegrasyonunu ve bakımı yönetirsiniz

## 2. Dizin Semantiği

- `raw/sources/`: Ham materyaller — makaleler, belgeler, PDF'ler, notlar, transkripsiyonlar, CSV'ler, vb.
- `raw/assets/`: Resimler, diyagramlar, ekler
- `wiki/overview.md`: Bu wikinizin temasını, amacını, hipotezlerini ve perspektiflerini düzenleyen ana sayfa
- `wiki/index.md`: Tüm wiki için içerik bazlı dizin
- `wiki/log.md`: Alımların, sorguların ve lintlerin kronolojik günlüğü
- `wiki/open-questions.md`: Çözülmemiş sorular, araştırma adayları, ertelenmiş sorunlar
- `wiki/sources/`: Her ham materyal için bir özet-ve-değerlendirme sayfası
- `wiki/concepts/`: Kavramlar, temalar, sorunlar ve tartışmalar için sayfalar
- `wiki/entities/`: İnsanlar, şirketler, ürünler, kuruluşlar, sistemler, vb. için sayfalar
- `wiki/syntheses/`: Karşılaştırmalar, analizler, sonuçlar, raporlar — yüksek-reuse sorgu sonuçları
- `wiki/maintenance/lint-reports/`: Periyodik inceleme raporları

## 3. Mutlak Kurallar

1. `raw/` içindeki dosyaları asla taşımayın, düzenlemeyin, silmeyin veya üzerine yazın
2. Spekülasyonu gerçekle asla karıştırmayın; her zaman kanıtın gücünü belirtin
3. Tüm içeriği Türkçe olarak yazın
4. Her şeyi Markdown'da yönetin
5. Yeni bilgi eklerken, bunu ilgili sayfalara yansıtmayı önceliklendirin
6. `wiki/index.md` ve `wiki/log.md` dosyalarını her değişiklikle güncelleyin
7. Var olan bir sayfaya ekleyebiliyorsanız, gereksiz yere yeni sayfa oluşturmayın
8. Çelişkiler bulduğunuzda sessizce üzerine yazmayın — hangi kaynağın ne söylediğini kaydedin
9. Alıntıları gerekli minimumla tutun; uzun sözlü alıntılardan kaçının
10. Şüphe ettiğinizde, düzenlemeden önce `index.md` ve ilgili sayfaları okuyarak yinelenmeleri ve ad çakışmalarını kontrol edin

## 4. Dil ve Adlandırma Kuralları

- Gövde metnini Türkçe olarak yazın
- Kural olarak dosya adları için ASCII `kebab-case` kullanın
- Görünen adları dosya adıyla değil, metin içi başlık ve frontmatter içindeki `title` ile ifade edin
- Kaynak özeti dosya adı için önerilen: `YYYY-MM-DD_source-<slug>.md`
- Sentezler için önerilen dosya adı: `YYYY-MM-DD_<topic-slug>.md`
- Varlık ve kavram sayfaları uzun ömürlüdür; adları kısa ve istikrarlı tutun

## 5. Ön Madde Kuralları

Yeni sayfalar genel olarak aşağıdaki ön maddeyi içermelidir:

```yaml
---
title: ""
type: source | concept | entity | synthesis | maintenance
status: draft | active | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
source_files: []
related_pages: []
---
```

Notlar:

- `source_files`, depo köküne göre göreli olacak şekilde `raw/` altındaki gerçek dosya yollarını listelemeli (örneğin `raw/sources/example.pdf`)
- `related_pages` ilgili `wiki/` sayfalarına göreli yolları listelemeli
- `status` normalde `active`; sadece eski bir sonuç yeni bir sonuç tarafından değiştirildiğinde `superseded` kullanın
- `overview.md`, `index.md`, `log.md` ve `open-questions.md` gibi temel iskelet sayfaları da `type: maintenance` kullanır

## 6. Sayfa Türüne Göre Beklenen İçerik

### source

- Materyalin özeti
- Ana noktalar
- İddialar ve kanıt
- Mevcut wikiye etki
- Çözülmemiş sorular

### concept

- Kavramın tanımı
- Güncel anlayış
- Rakip görüşler ve tartışmalar
- İlgili materyaller ve varlıklar
- Gelecekteki araştırma yönleri

### entity

- Konu hakkında genel bakış
- Ana gerçekler
- Zaman çizelgesi ve evrim
- Diğer kavramlar ve varlıklarla ilişkiler
- İzlenecek noktalar

### synthesis

- Soru
- Sonuç
- Hangi sayfaların kanıt olarak kullanıldığı
- Belirsizlikler
- Sonraki eylemler

### maintenance

- İncelemenin kapsamı
- Bulunan sorunlar
- Önerilen eylemler
- Öncelik seviyeleri

## 7. Alım Prosedürü

Yeni malzeme işlerken her zaman bu diziyi izleyin:

1. `wiki/index.md` ve `wiki/log.md` dosyalarını okuyarak son çalışmaları anlayın
2. `raw/sources/` kopyasından hedef malzemeyi okuyun
3. `templates/source-summary-template.md` rehberi olarak kullanarak `wiki/sources/` içinde bir özet sayfası oluşturun
4. Mevcut `concepts/`, `entities/` veya `overview.md` dosyalarının güncellenmesi gerekip gerekmediğini kontrol edin
5. Önemli çelişkiler veya yeni sorunlar ortaya çıkarsa, bunları `open-questions.md` içinde yansıtın
6. Yeni sayfayı bir özet ve güncelleme tarihi ile `wiki/index.md` içine ekleyin
7. `wiki/log.md` dosyasına bir alım günlüğü girişi ekleyin

### Alım Sırasında Karar Verme Kriterleri

- Var olan bir kavramı güçlendirirse, kavram sayfasına ekleyin
- Yeni bir özel isim görünürse ve yineleneceği muhtemelse, bir varlık sayfası oluşturun
- Konu önemliyse ancak hâlâ kaba ise, bir kavram sayfası oluşturun ve belirsiz parçaları işaretleyin
- Tek seferlik bir notsa, sadece bir kaynak özeti yeterli olabilir

## 8. Sorgu Prosedürü

Soruları yanıtlarken wiki'ye konuşma geçmişinden önce danışın.

1. Aday sayfaları tanımlamak için `wiki/index.md` dosyasını okuyun
2. Aday sayfaları okuyun; gerekirse kaynak özetine geri dönün
3. Bilgileri kanıt gücü sırasına göre düzenleyin ve yanıtlayın
4. Dayandığınız belirli wiki sayfalarını belirtin ve mümkünse yanıtta bunlara bağlantı verin
5. Yanıtta, gerçeği yorumdan ayırt edin
6. Yanıt yeniden kullanılabilir bir karşılaştırma, analiz veya özet ise, `wiki/syntheses/` içine kaydedin
7. Kaydedildiyse, `index.md` ve `log.md` dosyalarını güncelleyin

### Sentez Olarak Kaydetmeye Değer İçerik

- Karşılaştırma tabloları
- Karar vermek için düzenlenmiş malzeme
- Uzun biçimli analizler
- Birden çok kaynağı kapsayan sonuçlar
- Yeniden kullanılması olası SSS tarzı yanıtlar

## 9. Lint Prosedürü

Periyodik incelemeler sırasında her zaman aşağıdakileri kontrol edin:

- Çelişkili ifadeler birden çok sayfa arasında kalmakta mıdır?
- Yeni materyaller eski sonuçları geçersiz kıldı mı?
- Öksüz sayfalar mı birikmetedir?
- Önemli kavramlar kaynak özetlerinde dağılmış mı, kavram sayfalarına yükseltilmemiş mi?
- Henüz varlık, kavram veya sentez sayfalarına yükseltilmemiş önemli sorunlar var mı?
- `open-questions.md` içinde sorular mı yığılıyor?

Lint sonuçlarını `wiki/maintenance/lint-reports/` içine kaydedin ve bunları gerektiğinde `open-questions.md` ve `index.md` içinde yansıtın.

## 10. index.md Güncelleme Kuralları

- Her sayfa girişi tek satırda özü iletmelidir
- Kategoriye göre düzenleyin
- Yeni sayfa oluştururken her zaman bir giriş ekleyin
- Bir sayfanın durumu `superseded` olduğunda, bunu açıkça belirtin
- Mümkünse güncelleme tarihi ekleyin

Önerilen biçim:

```text
- [sayfa-başlığı](./sayfa/yolu.md): Bu sayfanın ne olduğunu kapsadığını açıklayan bir cümle. Son güncelleme: 2026-04-07
```

## 11. log.md Güncelleme Kuralları

Günlük, ek olarak kronolojik bir kayıttır. Mevcut günlük girişlerini yeniden yazmayın.

Aşağıdaki başlık biçimini tutarlı bir şekilde kullanın:

```text
## [YYYY-MM-DD] alım | materyal adı
## [YYYY-MM-DD] sorgu | sorunun özeti
## [YYYY-MM-DD] lint | kapsam
## [YYYY-MM-DD] güncelleme | açıklama
```

Her günlük girişi en azından şunları içermelidir:

- Ne yapıldı
- Hangi sayfalar oluşturuldu veya güncellendi
- Hangi konular çözülmemiş kaldı

## 12. Çapraz Referanslama

- Göreli yol Markdown bağlantılarını kullanın
- Mümkün olduğunda bağlantıları çift yönlü yapın
- Kaynak özetlerinden kavram/varlık sayfalarına ve tersi yönde bağlantı yapın
- İlgili terimler listelenmesine değil, bir bağlantının neden uygun olduğu hakkında bağlam sağlayın

## 13. Yazı Tonu

- Kısaca yazın
- Gerçeği, yorumu ve hipotezi ayırt edin
- İddialar kanıtla destekleyin
- Belirsiz içeriği açıkça "doğrulanmamış", "hipotez" veya "kaynaklar uyuşmuyor" gibi ifadelerle işaretleyin
- Konuşma tonu değil, yeniden kullanım için referans tarzında yazın

## 14. Şüphe Ettiğinizde Öncelik

1. `raw/` dosyalarına dokunmayın
2. Yinelemeyi önlemek için `index.md` ve mevcut sayfaları kontrol edin
3. Kaynak özeti oluşturun
4. Kavram / varlık / senteze sadece asgari olarak yükseltin
5. `index.md` ve `log.md` dosyalarını güncelleyin

## 15. Referans Şablonları

Yeni sayfalar oluştururken, gerektiğinde aşağıdakilerine danışın:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
