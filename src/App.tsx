/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Listbox, Transition } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight,
  Home,
  Camera,
  Info,
  Waves,
  ChevronDown,
  Check
} from 'lucide-react';

// --- Constants & Types ---

const CONTACT_METHODS = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/wisata_tanjung_gading' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/wisata.tanjunggading' },
  { name: 'WhatsApp', icon: Phone, href: 'https://wa.me/6281234567890' },
];

const NAVBAR_LINKS = [
  { name: 'Beranda', href: '#home', icon: Home },
  { name: 'Tentang', href: '#about', icon: Info },
  { name: 'Tipe Resort', href: '#resorts', icon: Waves },
  { name: 'Galeri', href: '#gallery', icon: Camera },
  { name: 'Kontak', href: '#contact', icon: Phone },
];

const RESORT_TYPES = [
  {
    id: 'pilihan-1',
    title: 'Pilihan 1',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 'Rp 1.200.000 / Malam',
    features: ['King Size Bed', 'AC', 'Private Terrace', 'Breakfast Included'],
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pilihan-2',
    title: 'Pilihan 2',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 'Rp 500.000 / Hari',
    features: ['Comfortable Seating', 'Electric Socket', 'Near Pool', 'Fan'],
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pilihan-3',
    title: 'Pilihan 3',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 'Rp 850.000 / Malam',
    features: ['Nature View', 'Unique Design', 'Cozy Interior', 'Eco Friendly'],
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800'
  }
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
];

// --- Sub-components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4 luxury-shadow' : 'bg-resort-beige py-4'}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group" aria-label="Wisata Tanjung Gading Home">
          <div className="w-10 h-10 bg-primary-green flex items-center justify-center rounded-full text-resort-beige" aria-hidden="true">
            <Waves size={24} />
          </div>
          <span className="text-xl font-serif font-semibold tracking-tighter transition-colors group-hover:text-primary-green">
            Tanjung Gading
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAVBAR_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-primary-green transition-colors focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 rounded-sm outline-none"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#booking"
            className="bg-primary-green text-resort-beige px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-primary-brown transition-all shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none"
          >
            Booking Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-resort-dark p-2 focus-visible:ring-2 focus-visible:ring-primary-green rounded-lg outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-resort-beige border-t border-resort-dark/10 shadow-2xl py-8 flex flex-col items-center gap-6 md:hidden"
            role="menu"
          >
            {NAVBAR_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif font-medium focus-visible:text-primary-green outline-none"
                role="menuitem"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary-green text-resort-beige px-10 py-3 rounded-full text-sm font-medium uppercase tracking-widest focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
              role="menuitem"
            >
              Booking Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
const CustomSelect = ({ label, icon: Icon, options, selected, setSelected }) => (
  <div className="w-full flex-1">
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="w-full text-left p-4 md:p-2 rounded-2xl md:rounded-none hover:bg-resort-beige/20 transition-colors focus:outline-none group">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-resort-dark/40 flex items-center gap-2 mb-1">
            <Icon size={14} className="group-hover:text-primary-green transition-colors" /> {label}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-resort-dark truncate">{selected}</span>
            <ChevronDown size={14} className="text-resort-dark/20 group-hover:text-resort-dark/50" />
          </div>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-white py-2 shadow-2xl ring-1 ring-black/5 focus:outline-none">
            {options.map((opt, idx) => (
              <Listbox.Option
                key={idx}
                value={opt}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-3 px-5 text-sm transition-colors ${
                    active ? 'bg-primary-green/5 text-primary-green' : 'text-resort-dark'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span className={selected ? 'font-bold' : 'font-normal'}>{opt}</span>
                    {selected && <Check size={14} />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);

const BookingShortcut = () => {
  const [guests, setGuests] = useState('1-2 Orang');
  const [type, setType] = useState('Deluxe Gazebo');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const sendWhatsApp = () => {
    const message = `Halo Wisata Tanjung Gading, saya ingin memesan ${type} untuk ${guests} dari tanggal ${startDate.toLocaleDateString()} ${endDate ? 'hingga' + endDate.toLocaleDateString() : ''}. Mohon infonya, terima kasih!`;
    const url = `${CONTACT_METHODS[2].href}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div id="booking" className="w-full max-w-6xl mx-auto -mt-12 relative z-30 px-6">
      <div className="bg-white p-3 md:p-2 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center border border-resort-dark/5">
        
        {/* Date Section*/}
        <div className="flex-[1.4] p-4 md:py-3 md:px-6 rounded-2xl md:rounded-none hover:bg-resort-beige/20 transition-colors group relative">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-resort-dark/40 flex items-center gap-2 mb-1 cursor-pointer">
            <Calendar size={14} className="group-hover:text-primary-green transition-colors" /> 
            Durasi Menginap
          </label>
          
          <div className="flex items-center">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              minDate={new Date()}
              monthsShown={1}
              placeholderText="Pilih Tanggal"
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-resort-dark outline-none cursor-pointer placeholder:text-resort-dark/20"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-resort-dark/10" />

        {/* Guests Dropdown */}
        <div className="flex-1 md:px-2">
          <CustomSelect 
            label="Jumlah Orang" 
            icon={Users} 
            options={['1-2 Orang', '3-4 Orang', '5+ Orang']} 
            selected={guests} 
            setSelected={setGuests} 
          />
        </div>

        <div className="hidden md:block w-px h-10 bg-resort-dark/10" />

        {/* Gazebo Type Dropdown */}
        <div className="flex-1 md:px-2">
          <CustomSelect 
            label="Tipe Gazebo" 
            icon={Waves} 
            options={['Pilihan 1', 'Pilihan 2', 'Pilihan 3']} 
            selected={type} 
            setSelected={setType} 
          />
        </div>

        {/* Action Button*/}
        <button 
          onClick={sendWhatsApp}
          className="w-full md:w-auto bg-primary-green text-white px-10 py-5 md:py-4 md:ml-2 rounded-[1.8rem] font-bold uppercase text-[11px] tracking-widest hover:bg-primary-brown transition-all shadow-lg hover:shadow-primary-green/20 active:scale-95 whitespace-nowrap">
          Cek Ketersediaan
        </button>
      </div>
    </div>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-resort-cream">
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-green inline-block mb-4">Momen Keindahan</span>
        <h2 className="text-4xl md:text-5xl font-serif">Galeri Tanjung Gading</h2>
        <div className="w-20 h-1 bg-primary-green mx-auto mt-6"></div>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`aspect-square overflow-hidden rounded-3xl luxury-shadow group cursor-pointer ${idx % 3 === 1 ? 'md:translate-y-8' : ''}`}
          >
            <img 
              src={img} 
              alt={`Gallery ${idx}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    guests: '1-2 Orang',
    type: 'Villa Premium Sangatta',
    contact: ''
  });

  const sendWhatsApp = () => {
    const message = `Halo Wisata Tanjung Gading, saya ${formData.name}. Saya ingin memesan ${formData.type} untuk ${formData.guests} pada tanggal ${formData.date}. Kontak saya: ${formData.contact}. Mohon infonya, terima kasih!`;
    const url = `${CONTACT_METHODS[2].href}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-resort-beige">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-green inline-block mb-4" aria-hidden="true">Hubungi Kami</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Lorem ipsum dolor sit amet</h2>
            <p className="text-resort-dark/60 mt-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad reiciendis quaerat laboriosam quo, minima aliquam tempora molestias illo asperiores ipsum quia veritatis, voluptatum atque, quam illum? Corporis quos repellat rerum.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow text-primary-green shrink-0" aria-hidden="true">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Lokasi</h4>
                <p className="text-resort-dark/60 text-sm mt-1">Jl. Tanjung Gading No. 12, Sangatta Utara, Kutai Timur, Kalimantan Timur</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow text-primary-green shrink-0" aria-hidden="true">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Telepon / WA</h4>
                <p className="text-resort-dark/60 text-sm mt-1">+62 812 3456 7890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] luxury-shadow border border-resort-dark/5 space-y-6" role="form" aria-labelledby="form-title">
            <h3 id="form-title" className="text-2xl font-serif">Formulir Pemesanan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="res-name" className="text-[10px] uppercase font-bold text-resort-dark/40 lg:tracking-wider">Nama Lengkap</label>
                <input 
                  id="res-name"
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-resort-beige/50 border border-transparent focus:border-primary-green/20 rounded-xl px-4 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary-green"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="res-contact" className="text-[10px] uppercase font-bold text-resort-dark/40 lg:tracking-wider">Nomor WhatsApp</label>
                <input 
                  id="res-contact"
                  type="tel" 
                  placeholder="0812..."
                  className="w-full bg-resort-beige/50 border border-transparent focus:border-primary-green/20 rounded-xl px-4 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary-green"
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="res-date" className="text-[10px] uppercase font-bold text-resort-dark/40 lg:tracking-wider">Tanggal</label>
                <input 
                  id="res-date"
                  type="date" 
                  className="w-full bg-resort-beige/50 border border-transparent focus:border-primary-green/20 rounded-xl px-4 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary-green"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="res-guests" className="text-[10px] uppercase font-bold text-resort-dark/40 lg:tracking-wider">Jumlah Orang</label>
                <select 
                  id="res-guests"
                  className="w-full bg-resort-beige/50 border border-transparent focus:border-primary-green/20 rounded-xl px-4 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary-green"
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  <option>1-2 Orang</option>
                  <option>3-4 Orang</option>
                  <option>5+ Orang</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="res-type" className="text-[10px] uppercase font-bold text-resort-dark/40 lg:tracking-wider">Tipe Penginapan</label>
              <select 
                id="res-type"
                className="w-full bg-resort-beige/50 border border-transparent focus:border-primary-green/20 rounded-xl px-4 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary-green"
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                {RESORT_TYPES.map(t => <option key={t.id}>{t.title}</option>)}
              </select>
            </div>
            <button 
              onClick={sendWhatsApp}
              className="w-full bg-primary-green text-resort-beige py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-primary-brown transition-all mt-4 flex items-center justify-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none"
            >
              Kirim via WhatsApp <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Page ---

export default function App() {
  return (
    <div className="min-h-screen Selection:bg-primary-green/10">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000" 
          alt="Tanjung Gading Hero" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-resort-beige/80 uppercase tracking-[0.4em] text-xs font-bold mb-6 inline-block">Escape to Nature</span>
            <h1 className="text-6xl md:text-8xl lg:text-[120px] text-resort-beige font-serif leading-[0.85] tracking-tighter mb-8">
              Wisata <br /> <span className="text-primary-green">Tanjung Gading</span>
            </h1>
            <p className="text-resort-beige/70 max-w-xl mx-auto text-lg font-light leading-relaxed mb-10">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, minus! Sit modi enim eligendi a inventore quos amet laborum suscipit!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#about" className="bg-resort-beige text-resort-dark px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-primary-green hover:text-white transition-all shadow-2xl">
                Jelajahi Resort
              </a>
              <a href="#contact" className="border border-resort-beige/30 text-resort-beige backdrop-blur-sm px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                Pesan Sekarang
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-12 bg-white/50 animate-pulse"></div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-white">Scroll Down</span>
        </div>
      </section>

      <BookingShortcut />

      {/* About Section */}
      <section id="about" className="py-32 bg-resort-beige overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-[3rem] overflow-hidden aspect-[4/5] luxury-shadow relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000" 
                alt="Tentang Kami" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-8 border-primary-green rounded-full z-0 opacity-20"></div>
          </div>
          
          <div className="space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-green">Selamat Datang</span>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              Lorem ipsum dolor sit amet
            </h2>
            <p className="text-resort-dark/60 leading-relaxed text-lg italic">
              "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </p>
            <p className="text-resort-dark/60 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet minima placeat officia recusandae dicta vitae aspernatur culpa nostrum facilis. Quod at quam possimus architecto labore praesentium provident adipisci inventore eligendi.
            </p>
            <div className="grid grid-cols-2 gap-8 py-6">
              <div>
                <h4 className="text-3xl font-serif text-primary-green">15+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-resort-dark/40 mt-1">Ekar Area Hijau</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-primary-green">500+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-resort-dark/40 mt-1">Weekly Visitors</p>
              </div>
            </div>
            {/* <button className="flex items-center gap-3 font-bold uppercase text-xs tracking-widest group">
              Baca Selengkapnya <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button> */}
          </div>
        </div>
      </section>

      {/* Resort Types */}
      <section id="resorts" className="py-24 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-green inline-block mb-4">Akomodasi</span>
            <h2 className="text-4xl md:text-6xl font-serif">Pilih Pengalaman Anda</h2>
          </div>
          <p className="text-resort-dark/60 md:text-right max-w-sm mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          {RESORT_TYPES.map((resort, idx) => (
            <motion.div 
              key={resort.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] luxury-shadow mb-8">
                <img 
                  src={resort.image} 
                  alt={resort.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  {resort.price}
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-4">{resort.title}</h3>
              <p className="text-resort-dark/60 text-sm leading-relaxed mb-6">
                {resort.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {resort.features.map(f => (
                  <li key={f} className="text-[9px] uppercase font-bold tracking-widest text-resort-dark/40 bg-resort-beige px-3 py-1 rounded-full border border-resort-dark/5">
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <GallerySection />
      <BookingForm />

      {/* Footer */}
      <footer className="bg-primary-brown text-resort-beige py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-green flex items-center justify-center rounded-full">
                <Waves size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold tracking-tight">Wisata Tanjung Gading</h2>
            </div>
            <p className="text-resort-beige/50 max-w-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda earum amet vel illo eveniet exercitationem eos sunt unde consequatur optio iste, harum, libero fugit ducimus placeat. Autem at odio dolorum.
            </p>
            <div className="flex gap-4">
              {CONTACT_METHODS.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="w-10 h-10 border border-resort-beige/20 rounded-full flex items-center justify-center hover:bg-primary-green hover:border-transparent transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <method.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-[0.3em]">Quick Links</h4>
            <ul className="space-y-4 text-resort-beige/50">
              {NAVBAR_LINKS.map(l => (
                <li key={l.name}><a href={l.href} className="hover:text-primary-green transition-colors">{l.name}</a></li>
              ))}
            </ul>
          </div>

          {/* <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-[0.3em]">Newsletter</h4>
            <p className="text-resort-beige/50 text-sm">Dapatkan info promo dan event spesial langsung di email Anda.</p>
            <div className="flex border-b border-resort-beige/20 pb-2">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-transparent w-full outline-none text-sm"
              />
              <button className="text-primary-green"><ArrowRight size={20} /></button>
            </div>
          </div> */}
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-resort-beige/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-resort-beige/30">
          <span>&copy; 2026 Wisata Tanjung Gading. All Rights Reserved.</span>
          {/* <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
