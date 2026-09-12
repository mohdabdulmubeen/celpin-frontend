import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Users,
  Sun,
  Crown,
  ShieldCheck,
  CreditCard,
  Wallet,
  CheckCircle2,
  Plus,
  Minus
} from 'lucide-react';
import { api } from '../services/api';
import { Seat, MenuItem, Booking, WorkspaceZone } from '../types';

interface BookingPageProps {
  onNavigate: (page: string) => void;
  initialSeatId?: string;
  initialZone?: WorkspaceZone;
  preselectedCart?: Record<string, number>;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigate,
  initialSeatId,
  initialZone = 'quiet',
  preselectedCart
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Selections
  const [selectedZone, setSelectedZone] = useState<WorkspaceZone>(initialZone);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [duration, setDuration] = useState<number>(2);
  const [preferences, setPreferences] = useState<string[]>(['power socket']);
  const [cart, setCart] = useState<Record<string, number>>(preselectedCart || {});
  
  // Payment info
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');
  const [customerName, setCustomerName] = useState('Rahul Verma');
  const [customerEmail, setCustomerEmail] = useState('rahul.verma@example.com');
  const [bookingResult, setBookingResult] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getSeats().then(data => {
      setSeats(data.seats);
      if (initialSeatId) {
        const found = data.seats.find(s => s.id === initialSeatId);
        if (found && found.status === 'available') {
          setSelectedSeat(found);
          setSelectedZone(found.zone);
        }
      }
    });
    api.getMenu().then(data => setMenuItems(data.items));
  }, [initialSeatId]);

  const availablePrefTags = [
    'near power socket',
    'quiet focus',
    'natural light',
    'good for calls',
    'dual screen setup',
    'whiteboard access'
  ];

  const togglePref = (tag: string) => {
    setPreferences(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const updateCart = (itemId: string, delta: number) => {
    setCart(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Pricing calculations
  const hourlyRate = selectedSeat?.hourlyRate || (selectedZone === 'quiet' ? 60 : selectedZone === 'collaboration' ? 70 : selectedZone === 'window' ? 80 : 100);
  const rawSeatCost = hourlyRate * duration;
  const dailyCapApplied = rawSeatCost > 399;
  const seatCost = dailyCapApplied ? 399 : rawSeatCost;

  const foodCost = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = menuItems.find(i => i.id === id);
    return total + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = seatCost + foodCost;

  const handleConfirmBooking = async () => {
    if (!selectedSeat) return;
    setIsSubmitting(true);

    const orderItems = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find(i => i.id === id);
      return {
        itemId: id,
        name: item?.name || id,
        price: item?.price || 0,
        quantity: qty
      };
    });

    try {
      const res = await api.createBooking({
        seatId: selectedSeat.id,
        zone: selectedZone,
        duration,
        preferences,
        seatCost,
        foodCost,
        discount: 0,
        totalCost: grandTotal,
        orderItems,
        customerName,
        customerEmail
      });
      setBookingResult(res.booking);
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const zonesList = [
    { id: 'quiet' as const, name: 'Quiet Zone', rate: 60, desc: 'Silent, focused work with noise-dampening panels.', icon: <Headphones className="h-5 w-5" /> },
    { id: 'collaboration' as const, name: 'Collaboration Table', rate: 70, desc: 'Open shared table ideal for team brainstorming.', icon: <Users className="h-5 w-5" /> },
    { id: 'window' as const, name: 'Window Seat', rate: 80, desc: 'Bright natural light with a view — creative flow.', icon: <Sun className="h-5 w-5" /> },
    { id: 'premium' as const, name: 'Premium Desk', rate: 100, desc: 'Motorized standing desk and dual monitor mount.', icon: <Crown className="h-5 w-5" /> }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Book Your Workspace</h1>
        <p className="mt-2 text-muted-foreground">Pick a seat, set your time, add coffee, and check out.</p>
      </div>

      {/* Progress Bar 4 Steps */}
      <div className="mb-10">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Step 1 */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => !bookingResult && setStep(1)}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 1 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Workspace
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 2 */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => !bookingResult && selectedSeat && setStep(2)}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 2 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Duration
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 3 */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => !bookingResult && selectedSeat && setStep(3)}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 3 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              3
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Add-ons
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 4 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 4 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 4 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              4
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 4 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Payment
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Step Content */}
        <div className="lg:col-span-2">
          {/* STEP 1: Select Workspace */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">Select your workspace</h2>
                <p className="text-sm text-muted-foreground">Choose a zone type, then pick an available seat.</p>
              </div>

              <div className="space-y-4">
                {zonesList.map(z => {
                  const zoneSeats = seats.filter(s => s.zone === z.id);
                  const availableInZone = zoneSeats.filter(s => s.status === 'available').length;
                  const isZoneActive = selectedZone === z.id;

                  return (
                    <div
                      key={z.id}
                      onClick={() => setSelectedZone(z.id)}
                      className={`rounded-xl border p-5 transition-all cursor-pointer ${
                        isZoneActive
                          ? 'border-primary ring-2 ring-primary/20 bg-card shadow-md'
                          : 'border-border bg-card hover:border-border/80 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                            {z.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">{z.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{z.desc}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-base">₹{z.rate}</p>
                          <p className="text-xs text-muted-foreground">/hour</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/60">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                            {availableInZone} available
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {zoneSeats.map(seat => {
                            const isSelected = selectedSeat?.id === seat.id;
                            const isAvailable = seat.status === 'available';

                            return (
                              <button
                                key={seat.id}
                                disabled={!isAvailable}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSeat(seat);
                                  setSelectedZone(seat.zone);
                                }}
                                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-sm font-medium transition-all ${
                                  isSelected
                                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                    : isAvailable
                                    ? 'border-border hover:border-primary/50 hover:bg-accent text-foreground'
                                    : 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50'
                                }`}
                              >
                                <span className="font-bold">{seat.name}</span>
                                <span className="text-[11px] opacity-80 capitalize">
                                  {seat.status}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Duration & Preferences */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">Duration & Preferences</h2>
                <p className="text-sm text-muted-foreground">Select how long you plan to stay and any setup preferences.</p>
              </div>

              {/* Duration Selector */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-sm">Booking Hours</span>
                  <span className="text-2xl font-bold font-display text-primary">{duration} Hour{duration > 1 ? 's' : ''}</span>
                </div>

                <div className="grid grid-cols-6 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6].map(hrs => (
                    <button
                      key={hrs}
                      onClick={() => setDuration(hrs)}
                      className={`h-12 rounded-xl font-bold text-sm transition-all ${
                        duration === hrs
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'border border-border bg-background hover:bg-accent text-foreground'
                      }`}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>

                {dailyCapApplied && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-success text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Daily Maximum Cap of ₹399 applied! You save ₹{rawSeatCost - 399}.
                  </div>
                )}
              </div>

              {/* Work Preferences Tags */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h3 className="font-semibold text-sm mb-2">Work Preferences</h3>
                <p className="text-xs text-muted-foreground mb-4">Select all tags that fit your work session.</p>

                <div className="flex flex-wrap gap-2">
                  {availablePrefTags.map(tag => {
                    const active = preferences.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => togglePref(tag)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                          active
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'border border-border bg-background text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {active && '✓ '} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Café Pre-Orders */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">Pre-Order Food & Drinks</h2>
                <p className="text-sm text-muted-foreground">Items will be freshly prepared and brought to your desk upon QR check-in.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {menuItems.map(item => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-card p-4 flex items-center justify-between shadow-xs"
                    >
                      <div className="flex-1 pr-3">
                        <p className="font-medium text-sm text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                        <p className="text-sm font-semibold mt-1">₹{item.price}</p>
                      </div>

                      {qty > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCart(item.id, -1)}
                            className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">{qty}</span>
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateCart(item.id, 1)}
                          className="h-8 px-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-medium inline-flex items-center gap-1 shadow-xs"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Payment or QR Check-in Display */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {bookingResult ? (
                /* Booking Success / QR Pass */
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/15 text-success mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Booking Confirmed!</h2>
                  <p className="text-sm text-muted-foreground mt-1">Your seat is reserved. Show this pass at the entrance.</p>

                  {/* Pass Box */}
                  <div className="mt-8 max-w-sm mx-auto p-6 rounded-2xl border border-border bg-card shadow-lg ring-1 ring-primary/20">
                    <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-2">Digital Check-In Pass</p>
                    <div className="flex justify-center my-4">
                      <img
                        src={bookingResult.qrCodeUrl}
                        alt="Booking QR Code"
                        className="h-44 w-44 rounded-xl border border-border p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Booking Reference</p>
                      <p className="font-mono text-lg font-bold text-primary">{bookingResult.bookingRef}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border text-left text-xs">
                      <div>
                        <span className="text-muted-foreground">Seat:</span>
                        <p className="font-bold text-sm text-foreground">{bookingResult.seatId} ({bookingResult.zone})</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-bold text-sm text-foreground">{bookingResult.durationHours} Hours</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Entry PIN:</span>
                        <p className="font-mono font-bold text-sm text-foreground">{bookingResult.pin}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Paid:</span>
                        <p className="font-bold text-sm text-success">₹{bookingResult.totalCost}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      onClick={() => onNavigate('floor-map')}
                      className="inline-flex items-center justify-center text-sm font-medium border border-border bg-background hover:bg-accent h-10 px-5 rounded-xl"
                    >
                      View Live Floor Map
                    </button>
                    <button
                      onClick={() => onNavigate('rewards')}
                      className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-xl shadow-xs"
                    >
                      Check Earned Credits
                    </button>
                  </div>
                </div>
              ) : (
                /* Payment form */
                <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Complete Payment</h2>
                    <p className="text-sm text-muted-foreground">Select your payment method and enter contact information.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'upi' ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-semibold">UPI / QR Payment</p>
                          <p className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-semibold">Credit / Debit Card</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Your Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Email for Pass & Receipt</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/40 border border-border flex items-center gap-3 text-xs text-muted-foreground">
                    <ShieldCheck className="h-5 w-5 text-success shrink-0" />
                    <span>256-bit encrypted checkout. You will earn +{Math.round(grandTotal / 25)} reward credits with this booking!</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card shadow-sm sticky top-24 p-6 space-y-5">
            <h3 className="font-semibold tracking-tight text-lg">Booking Summary</h3>

            {selectedSeat ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Seat</span>
                  <span className="font-bold text-foreground">{selectedSeat.name} ({selectedSeat.zone})</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">{duration} Hour{duration > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Workspace Cost</span>
                  <span className="font-medium text-foreground">
                    ₹{seatCost} {dailyCapApplied && <span className="text-xs text-success font-semibold">(Cap)</span>}
                  </span>
                </div>

                {foodCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-muted-foreground">Café Add-ons</span>
                    <span className="font-medium text-foreground">₹{foodCost}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">₹{grandTotal}</span>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="text-sm text-muted-foreground italic">No seat selected yet</p>
                <div className="pt-4 flex justify-between items-baseline border-t border-border mt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">₹0</span>
                </div>
              </div>
            )}

            {!bookingResult && (
              <div className="pt-2 space-y-2">
                {step < 4 ? (
                  <button
                    disabled={!selectedSeat}
                    onClick={() => setStep((step + 1) as any)}
                    className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-1.5 shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    Continue to {step === 1 ? 'Duration' : step === 2 ? 'Add-ons' : 'Payment'}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    disabled={isSubmitting || !selectedSeat}
                    onClick={handleConfirmBooking}
                    className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-2 shadow-sm disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? 'Processing...' : `Pay ₹${grandTotal} & Get Pass`}
                  </button>
                )}

                {step > 1 && !bookingResult && (
                  <button
                    onClick={() => setStep((step - 1) as any)}
                    className="w-full inline-flex items-center justify-center text-xs text-muted-foreground hover:text-foreground h-8 gap-1 transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Previous Step
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => onNavigate('floor-map')}
              className="w-full inline-flex items-center justify-center text-xs text-muted-foreground hover:text-foreground pt-2 border-t border-border transition-colors gap-1"
            >
              Prefer visual floor map? View Floor Map <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
