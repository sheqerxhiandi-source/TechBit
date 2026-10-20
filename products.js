// ============================================================
// products.js
// Central product data source, shared by index.html, shop.html,
// product.html, and cart.html via <script src="products.js">.
// Edit this array to add/remove/change products — every page
// that lists products reads from here, so you only edit once.
// ============================================================

const PRODUCTS = [
  { id: 1,  name: "ESP32 DevKit V1",                     price: 6.50, icon: "fa-solid fa-microchip",          category: "Development Boards", popular: true,
    desc: "A powerful Wi-Fi + Bluetooth development board built around the ESP32 chip. Ideal for IoT projects, home automation, and wireless sensor networks." },
  { id: 2,  name: "Arduino Uno R3",                      price: 8.90, icon: "fa-brands fa-usb",                category: "Development Boards", popular: true,
    desc: "The classic Arduino Uno R3 board, based on the ATmega328P. Perfect for beginners and hobbyists learning embedded electronics." },
  { id: 3,  name: "HC-SR04 Ultrasonic Sensor",            price: 1.20, icon: "fa-solid fa-satellite-dish",     category: "Sensors & Modules", popular: true,
    desc: "Measures distance using ultrasonic pulses, with a range of 2cm to 400cm. Commonly used in robotics and obstacle-avoidance projects." },
  { id: 4,  name: "0.96\" OLED Display (SSD1306)",        price: 2.80, icon: "fa-regular fa-rectangle-list",   category: "Displays", popular: true,
    desc: "A crisp monochrome OLED display, 128x64 pixels, communicating over I2C. Great for showing sensor readings and menus." },
  { id: 5,  name: "MB-102 Breadboard 830 Points",         price: 1.50, icon: "fa-solid fa-border-all",         category: "Prototyping", popular: true,
    desc: "A solderless breadboard with 830 tie points, perfect for prototyping circuits quickly and cleanly." },
  { id: 6,  name: "Jumper Wire Set (M/M, F/F, M/F)",      price: 3.20, icon: "fa-solid fa-plug",                category: "Components", popular: true,
    desc: "A set of 120 jumper wires in three configurations (male-male, female-female, male-female) for flexible breadboard wiring." },
  { id: 7,  name: "DHT11 Temperature & Humidity Sensor",  price: 1.10, icon: "fa-solid fa-temperature-half",   category: "Sensors & Modules", popular: true,
    desc: "A basic digital sensor for measuring temperature and humidity, widely used in weather stations and home automation." },
  { id: 8,  name: "1 Channel Relay Module 5V",            price: 1.30, icon: "fa-solid fa-toggle-on",          category: "Components", popular: true,
    desc: "A 5V single-channel relay module that lets a microcontroller safely switch higher-power AC/DC loads on and off." },
  { id: 9,  name: "L298N Motor Driver Module",            price: 3.90, icon: "fa-solid fa-gears",               category: "Robotics", popular: false,
    desc: "Dual H-bridge motor driver capable of controlling two DC motors or one stepper motor, commonly used in robotics." },
  { id: 10, name: "NodeMCU ESP8266",                      price: 4.50, icon: "fa-solid fa-wifi",                category: "Development Boards", popular: false,
    desc: "A compact Wi-Fi enabled development board based on the ESP8266 chip, great for simple IoT projects." },
  { id: 11, name: "5V 2A Power Supply Adapter",           price: 5.90, icon: "fa-solid fa-plug-circle-bolt",   category: "Power Supplies", popular: false,
    desc: "A regulated 5V 2A power adapter suitable for powering development boards and small projects." },
  { id: 12, name: "WS2812B RGB LED Strip (1m)",           price: 7.20, icon: "fa-solid fa-lightbulb",          category: "LED & Lighting", popular: false,
    desc: "An addressable RGB LED strip with 60 LEDs per meter, individually controllable for custom lighting effects." },
];

// Helper: find a product by id (ids come in as strings from the URL,
// so we compare loosely with ==).
function findProduct(id) {
  return PRODUCTS.find(p => p.id == id);
}
