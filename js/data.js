// Array de productos 
const products = [{
    id: 1,
    name: 'Auriculares Redragon Zeus H510',
    price: 15000,
    category: 'Perifericos',
    img: 'img/auris.jpg',
},
{
    id: 2,
    name: 'Fuente Redragon Gc-ps010 850w 80 Plus Gold',
    price: 24690,
    category: 'PC y componentes',
    img: 'img/fuente1.jpg',
},
{
    id: 3,
    name: 'Fuente Evga 500w 80 Plus White W2',
    price: 12540,
    category: 'PC y componentes',
    img: 'img/fuente2.jpg',
},
{
    id: 4,
    name: 'Joystick Play Station 5',
    price: 23800,
    category: 'Consolas',
    img: 'img/joystick.jpg',
},
{
    id: 5,
    name: 'Joystick PS4',
    price: 12700,
    category: 'Consolas',
    img: 'img/joystickps4.jpg',
},
{
    id: 6,
    name: 'Monitor 24" ViewSonic 165 hz',
    price: 90910,
    category: 'Perifericos',
    img: 'img/monitor.jpg',
},
{
    id: 7,
    name: 'Mouse Redragon Pro M808',
    price: 9500,
    category: 'Perifericos',
    img: 'img/mouse.jpg',
},
{
    id: 8,
    name: 'Mouse Pad Game Pro Gp-6004 Rgb 35x80',
    price: 4700,
    category: 'Perifericos',
    img: 'img/mousepad.jpg',
},
{
    id: 9,
    name: 'Notebook Aorus Xd 17.3" fhd 300hz | i7 | Rtx 3070 | Ram 16gb | Ssd 512gb',
    price: 545000,
    category: 'PC y componentes',
    img: 'img/notebookaourus.jpg',
},
{
    id: 10,
    name: 'PC Gamer Alta Gama',
    price: 310000,
    category: 'PC y componentes',
    img: 'img/pcalta.jpg',
},
{
    id: 11,
    name: 'PC Gamer Baja Gama',
    price: 120200,
    category: 'PC y componentes',
    img: 'img/pcbaja.jpeg',
},
{
    id: 12,
    name: 'PC Gamer Media Gama',
    price: 202700,
    category: 'PC y componentes',
    img: 'img/pcmedia.jpg',
},
{
    id: 13,
    name: 'Placa De Video Geforce Rtx 3090 Evga',
    price: 495000,
    category: 'PC y componentes',
    img: 'img/placa.jpg',
},
{
    id: 14,
    name: 'Placa De Video Geforce Gtx 1660 Zotac',
    price: 96000,
    category: 'PC y componentes',
    img: 'img/placa2.jpg',
},
{
    id: 15,
    name: 'Placa De Video Msi Gt 730',
    price: 25000,
    category: 'PC y componentes',
    img: 'img/placa3.jpg',
},
{
    id: 16,
    name: 'Play Station 4 500gb',
    price: 88000,
    category: 'Consolas',
    img: 'img/ps4.jpg',
},
{
    id: 17,
    name: 'Play Station 5 1TB',
    price: 269000,
    category: 'Consolas',
    img: 'img/ps5.jpg',
},
{
    id: 18,
    name: 'Gift Card Play Station US$20',
    price: 7100,
    category: 'Consolas',
    img: 'img/psstore.jpg',
},
{
    id: 19,
    name: 'Memoria RAM Ddr4 8gb 3200mhz Corsair',
    price: 15000,
    category: 'PC y componentes',
    img: 'img/ram.jpg',
},
{
    id: 20,
    name: 'Memoria Ram Sodimm Ddr4 Hikvision Neo 8gb 2666mhz',
    price: 10700,
    category: 'PC y componentes',
    img: 'img/ram2.jpg',
},
{
    id: 21,
    name: 'Disco sólido 1TB Aorus M2 Nvme',
    price: 43700,
    category: 'PC y componentes',
    img: 'img/ssd.jpg',
},
{
    id: 22,
    name: 'Stream Deck Elgato Mk.2 15 White',
    price: 48800,
    category: 'Perifericos',
    img: 'img/streamdeck.jpg',
},
{
    id: 23,
    name: 'Tableta Digitalizadora Xp-pen Deco Mini7 Wireless',
    price: 16790,
    category: 'Perifericos',
    img: 'img/tableta.jpg',
},
{
    id: 24,
    name: 'Teclado Mecanico Game Pro Gk-70m Rgb Black',
    price: 7700,
    category: 'Perifericos',
    img: 'img/tecladomecanico.jpg',
},
{
    id: 25,
    name: 'Webcam Redragon Gw600 Fobos',
    price: 6520,
    category: 'Perifericos',
    img: 'img/webcam.jpg',
},
{
    id: 26,
    name: 'Xbox Game Pass',
    price: 3600,
    category: 'Consolas',
    img: 'img/xboxcard.jpg',
},
{
    id: 27,
    name: 'Xbox Series S',
    price: 128000,
    category: 'Consolas',
    img: 'img/xboxseriess.jpg',
},
{
    id: 28,
    name: 'Xbox Series X',
    price: 240000,
    category: 'Consolas',
    img: 'img/xboxseriesx.jpg'
},
{
    id: 29,
    name: 'Procesador Ryzen 5 5600g',
    price: 69400,
    category: 'PC y componentes',
    img: 'img/amd.jpg',
},
{
    id: 30,
    name: 'Mother Am4 Msi A520m-a Pro',
    price: 19500,
    category: 'PC y componentes',
    img: 'img/motheramd.jpg',
},
{
    id: 31,
    name: 'Mother Msi Pro H610m-b Ddr4',
    price: 22600,
    category: 'PC y componentes',
    img: 'img/motherintel.jpg',
},
{
    id: 32,
    name: 'Procesador Intel Core I5 12400f ',
    price: 67900,
    category: 'PC y componentes',
    img: 'img/intel.jpg',
}];

//dividir el array en 8 

const splitProducts = size => {
    let dividedCards = [];
    for (let i = 0; i < products.length; i += size) {
      dividedCards.push(products.slice(i, i + size));
    }
    return dividedCards;
  };
  
  const cardsController = {
    dividedCards: splitProducts(8),
    nextProductsIndex: 1,
    cardsLimit: splitProducts(8).length,
  };

 