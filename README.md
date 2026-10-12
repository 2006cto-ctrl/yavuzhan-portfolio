# Yavuzhan Önder — Portfolyo

3D ve 2D çalışmalarımı içeren kişisel portfolyom. Blender ve Photoshop çalışmalarını büyük görseller, çalışmaya göre değişen renkler ve animasyonlu geçişlerle sunar.

- Türkçe ve İngilizce arayüz
- 15 adet 3D çalışma ve 4 adet 2D çalışma
- Kaynağı bulunan 6 çalışmada Cycles ana render ve Clay seçimi
- Render ve Clay arka planlarıyla bütünleşen, ekran boyutuna uyarlanan sunum
- Uygun çalışmalarda isteğe bağlı 3D görüntüleme
- İmlecin bulunduğu bölgeye scroll ile yakınlaştırma
- Masaüstü ve mobil uyumlu tasarım
- 3D/2D koleksiyonlar için yansımalı yatay galeri
- Scroll ve sürükleme hızına göre 180–550 ms arasında değişen kart geçişleri
- Ekran yüksekliğine göre kesilmeden sönen yansımalar ve daha uzak galeri görünümü
- Koyu petrol ve kahve tonlarıyla sinematik motion marka kiti
- Yumuşak görsel geçişleri, kısa metinler ve tamamen sessiz etkileşim
- Azaltılmış hareket tercihine uyum ve 3D sürükleme sonrası yumuşak kamera dönüşü

Neon sokak görsel olarak yer alır; bu çalışma için 3D görüntüleme yoktur. Katana ve kın modeli orijinal doku haritalarıyla hazırlanmıştır.

## Yerel önizleme

Bu klasörde `python -m http.server 8765` komutunu çalıştırıp tarayıcıda `http://localhost:8765/` adresini açın. Kurulum veya derleme gerekmez. 3D modeller yalnızca “3D görüntüle” düğmesine basıldığında yüklenir.

## Dosyalar

`index.html` ana sayfadır. `assets/` web görselleri, betikler, stiller ve hafif GLB modellerini içerir. `images/` özgün çalışma görsellerini, `images/renders/` ise 12 tam çözünürlüklü Cycles PNG çıktısını içerir. Web görünümünde hafif WebP dosyaları yüklenir; PNG yalnızca tam görsel bağlantısıyla açılır. Blender kaynakları bu depoya dahil değildir.

Arayüz animasyonları tarayıcının Web Animations API özelliğini kullanır. 3D görüntüleyici model-viewer kütüphanesinin lisansı `assets/vendor/` klasöründedir. Önceki sürümün Motion dosyaları ve lisansı da bu klasörde korunur.
