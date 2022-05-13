console.log('photo.js download');

const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview > img:nth-child(1)');
const houseImages = document.querySelector('#images');
const adFormPhotoContainer = document.querySelector('.ad-form__photo');

const TYPE_OF_FILES = ['.jpg', '.png', '.gif', 'jpeg'];

// создание картинки для превьюшки объявления
const createImg = () => {
  const img = document.createElement('img');
  img.style.height = '70px';
  img.style.width = '70px';
  img.style.src = '';
  return img;
}

// очистка аватарки и превьюшки объявления. Вызываем при нажатии "очистить" и "опубликовать"
const clearImages = () => {
  adFormPhotoContainer.innerHTML = '';
  preview.src = 'img/muffin-grey.svg';
}

// // изменение аватарки. Вызываем при активации формы
const adFormAvatarChange = () => {
  avatar.addEventListener('change', () => {
    let file = avatar.files[0];
    let fileName = file.name.toLowerCase();
    const isImage = TYPE_OF_FILES.some((item) => {
      return fileName.endsWith(item);
    })

// загрузка в формате base64 (кодирование изображения)
    // if (isImage) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.addEventListener('load', () => {
    //     preview.src = reader.result;
    //     console.log(preview.src)
    //   })
    // }

    //  прямой доступ к blob-элементу через ссылку
    if (isImage) {
      preview.src = URL.createObjectURL(file);
      console.log(preview.src)
    }
  })
}

// изменение превьюшки объявления. Вызываем при активации формы
const adFormPhotoChange = () => {
  houseImages.addEventListener('change', () => {
    adFormPhotoContainer.innerHTML = '';
    let img = createImg();
    adFormPhotoContainer.append(img);
    console.log(adFormPhotoContainer);
    console.log(img);
    let file = houseImages.files[0];
    let fileName = file.name.toLowerCase();

    const isImage = TYPE_OF_FILES.some((item) => {
      return fileName.endsWith(item);
    })

    if (isImage) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        img.src = reader.result;
      })
    }
  })
}

export {
  clearImages,
  adFormAvatarChange,
  adFormPhotoChange
}
