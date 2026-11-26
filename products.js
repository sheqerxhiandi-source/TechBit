// ============================================================
// products.js
// Central product data source, shared by index.html, shop.html,
// product.html, and cart.html via <script src="products.js">.
// Edit this array to add/remove/change products — every page
// that lists products reads from here, so you only edit once.
// ============================================================

const PRODUCTS = [
  { id: 1,  name: "ESP32 DevKit V1 ESP32-WROOM-32",       price: 12.99, icon: "fa-solid fa-microchip",         image: "images/product-crops/esp32-user-photo-cutout.png", category: "Development Boards", popular: true,
    desc: "ESP32-WROOM-32 development board with 38 pins, CP2102 USB-to-serial, and a Type-C connector. Ideal for Wi-Fi and Bluetooth projects." },
  { id: 2,  name: "UNO R3 (ATmega328P CH340 + USB)",      price: 19.99, icon: "fa-brands fa-usb",               image: "images/arduino-user-sticker-crop.png", category: "Development Boards", popular: true,
    desc: "UNO R3 compatible development board based on the ATmega328P, with a CH340 USB interface and USB cable." },
  { id: 13, name: "Nano V3 (ATmega328P CH340)",           price: 9.99, icon: "fa-solid fa-microchip",          image: "images/product-crops/nano-v3-user-cutout.png", category: "Development Boards", popular: true,
    desc: "Compact Nano V3 development board based on the ATmega328P with a CH340 USB interface." },
  { id: 5,  name: "830-Point Breadboard",                  price: 3.99, icon: "fa-solid fa-border-all",         image: "images/product-crops/breadboard-cutout.png", category: "Prototyping", popular: true,
    desc: "Solderless 830-point breadboard for assembling and testing prototype circuits." },
  { id: 6,  name: "40pcs M-M Jumper Wire (20cm)",         price: 2.99, icon: "fa-solid fa-plug",               image: "images/product-crops/jumper-wires-mf-cutout.png", category: "Components", popular: false,
    desc: "Set of 40 male-to-male Dupont jumper wires, 20 cm long, for breadboard and module connections." },
  { id: 14, name: "40pcs M-F Jumper Wire (20cm)",         price: 2.99, icon: "fa-solid fa-plug",               image: "images/product-crops/jumper-wires-mf-cutout.png", category: "Components", popular: false,
    desc: "Set of 40 male-to-female Dupont jumper wires, 20 cm long, for connecting boards to modules." },
  { id: 15, name: "40pcs F-F Jumper Wire (20cm)",         price: 2.99, icon: "fa-solid fa-plug",               image: "images/product-crops/jumper-wires-mf-cutout.png", category: "Components", popular: false,
    desc: "Set of 40 female-to-female Dupont jumper wires, 20 cm long, for connecting modules and sensors." },
  { id: 3,  name: "HC-SR04 Ultrasonic Sensor",             price: 3.49, icon: "fa-solid fa-satellite-dish",    image: "images/product-crops/hc-sr04-user-cutout.png", category: "Sensors & Modules", popular: true,
    desc: "Ultrasonic distance sensor for measuring range in robotics, obstacle detection, and other electronics projects." },
  { id: 16, name: "HC-SR501 PIR Sensor",                   price: 3.49, icon: "fa-solid fa-person-walking",    image: "images/product-crops/pir-sensor-user-cutout.png", category: "Sensors & Modules", popular: false,
    desc: "Passive infrared motion sensor module for detecting movement in automation and security projects." },
  { id: 7,  name: "DHT11 Temperature & Humidity",          price: 2.99, icon: "fa-solid fa-temperature-half",  image: "images/product-crops/dht11-user-cutout.png", category: "Sensors & Modules", popular: false,
    desc: "Digital temperature and humidity sensor module for weather stations and environmental monitoring." },
  { id: 8,  name: "1-Channel 5V Relay Module",             price: 2.99, icon: "fa-solid fa-toggle-on",         image: "images/product-crops/relay-module-user-cutout.png", category: "Components", popular: false,
    desc: "Single-channel 5V relay module for switching external loads from a microcontroller project." },
  { id: 17, name: "LM2596 Adjustable DC-DC Module",        price: 2.99, icon: "fa-solid fa-bolt",               image: "images/product-crops/lm2596-user-cutout.png", category: "Power Supplies", popular: false,
    desc: "Adjustable DC-DC buck converter module for regulating voltage in electronics projects." },
  { id: 18, name: "SG90 Servo",                            price: 3.99, icon: "fa-solid fa-gears",              image: "images/product-crops/sg90-user-cutout.png", category: "Robotics", popular: true,
    desc: "Compact SG90 servo motor for small robotics, model, and motion-control projects." },
  { id: 4,  name: "0.96-inch I2C OLED Display",            price: 6.99, icon: "fa-regular fa-rectangle-list",  image: "images/product-crops/oled-user-cutout.png", category: "Displays", popular: true,
    desc: "Compact 0.96-inch I2C OLED display for showing readings, menus, and status information." },
  { id: 19, name: "LCD1602 with I2C",                      price: 6.99, icon: "fa-regular fa-rectangle-list",  image: "images/product-crops/lcd1602-user-cutout.png", category: "Displays", popular: false,
    desc: "16x2 character LCD display with an I2C interface for simple text and data readouts." },
  { id: 20, name: "Active Buzzer Module",                  price: 1.99, icon: "fa-solid fa-volume-high",       image: "images/product-crops/active-buzzer-user-cutout.png", category: "Components", popular: false,
    desc: "Active buzzer module for adding audible alerts and simple sound feedback to projects." },
  { id: 21, name: "5mm LED (Each)",                        price: 0.025, icon: "fa-solid fa-lightbulb",        image: "images/product-crops/leds-assortment-user-cutout.png", category: "LED & Lighting", popular: false,
    desc: "Single 5mm LED diode; color may vary between red, green, yellow, blue, and white." },
  { id: 22, name: "1/4W Resistor (Each)",                 price: 0.025, icon: "fa-solid fa-grip",              image: "images/product-crops/resistors-user-cutout.png", category: "Components", popular: false,
    desc: "Single 1/4-watt resistor from the assortment for prototyping, repair, and electronics projects." },
  { id: 23, name: "Tactile Push Button (Each)",           price: 0.20,  icon: "fa-regular fa-square",          image: "images/product-crops/tactile-buttons-user-cutout.png", category: "Components", popular: false,
    desc: "Single 6x6x5 mm DIP tactile push button for user input and control circuits." },
  { id: 24, name: "Assorted Potentiometers (50 pcs)",      price: 12.99, icon: "fa-solid fa-sliders",          image: "images/product-crops/potentiometers-user-cutout.png", category: "Components", popular: false,
    desc: "Set of 50 3362P potentiometers across 10 resistance values, from 100 ohms to 1 megohm." },
  { id: 25, name: "Large Dupont Connector Assortment",     price: 9.99, icon: "fa-solid fa-plug",               image: "images/product-crops/dupont-assortment-user-cutout.png", category: "Components", popular: false,
    desc: "Assorted Dupont connectors for making and repairing jumper leads and electronics wiring." },
  { id: 26, name: "Large JST-XH Connector Assortment",     price: 12.99, icon: "fa-solid fa-plug",              image: "images/product-crops/jst-xh-4pin-user-cutout.png", category: "Components", popular: false,
    desc: "Assorted JST-XH connectors for making secure wire-to-board connections." },
  { id: 27, name: "Pin-Header Strips (2.54*1*40P)",       price: 0.79, icon: "fa-solid fa-grip-lines",        image: "images/product-crops/pin-header-user-cutout.png", category: "Components", popular: false,
    desc: "1x40 pin-header strip with 2.54 mm spacing for boards and custom electronics builds." },
  { id: 28, name: "Heat-Shrink Assortment Kits",           price: 4.99, icon: "fa-solid fa-grip-lines-vertical", image: "images/product-crops/heat-shrink-assortment-cutout.png", category: "Components", popular: false,
    desc: "Assortment kit of heat-shrink tubing for insulating and protecting wire connections." },
  { id: 29, name: "Complete UNO R3 Beginner Starter Kit",  price: 40.00, icon: "fa-solid fa-toolbox",           image: "images/product-crops/uno-starter-kit-user-cutout.png", category: "Development Boards", popular: true,
    desc: "Complete UNO R3-compatible beginner kit for learning microcontroller programming and basic electronics." },
];

// Helper: find a product by id (ids come in as strings from the URL,
// so we compare loosely with ==).
function findProduct(id) {
  return PRODUCTS.find(p => p.id == id);
}
