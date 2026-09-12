import React from 'react';
import {
  ArrowRight,
  MapPin,
  Wifi,
  Zap,
  Coffee,
  QrCode,
  Star,
  Headphones,
  Users,
  Sun,
  Crown,
  CheckCircle2,
  Clock,
  Award,
  Quote
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                </span>
                11 seats available right now
              </div>

              {/* Heading */}
              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                Your workspace.<br />
                <span className="text-primary">By the hour.</span><br />
                With great coffee.
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Celpin blends a premium co-working space with your favourite café. Pick a seat on the live floor map, book 1–6 hours, pre-order coffee to your desk, and check in with a QR code.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('booking')}
                  className="inline-flex items-center justify-center font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2 text-base h-12 px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book Your Seat
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigate('floor-map')}
                  className="inline-flex items-center justify-center font-medium transition-all border border-input bg-card hover:bg-accent hover:text-accent-foreground rounded-xl gap-2 text-base h-12 px-6 shadow-xs hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  View Live Map
                </button>
              </div>

              {/* Features inline */}
              <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Wifi className="h-4 w-4 text-success" />
                  Fast Wi-Fi
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-success" />
                  Power at every seat
                </div>
                <div className="flex items-center gap-1.5">
                  <Coffee className="h-4 w-4 text-success" />
                  Coffee to your desk
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
                <img
                  src="https://images.pexels.com/photos/4339913/pexels-photo-4339913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Professionals working in a modern café co-working space"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute -bottom-5 -left-5 hidden sm:block">
                <div className="rounded-xl border bg-card text-card-foreground w-56 shadow-xl border-border/70 backdrop-blur-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/15 text-success">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">QR Check-In</p>
                      <p className="text-xs text-muted-foreground">Scan & sit in 5 sec</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-5 -right-5 hidden sm:block">
                <div className="rounded-xl border bg-card text-card-foreground w-52 shadow-xl border-border/70 backdrop-blur-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">4.8 / 5.0</p>
                      <p className="text-xs text-muted-foreground">2,400+ bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">12</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Seats Available</p>
              <p className="text-xs text-muted-foreground/70">/15 live</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">₹60</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Hourly Rate</p>
              <p className="text-xs text-muted-foreground/70">–₹100</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">₹399</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Daily Max</p>
              <p className="text-xs text-muted-foreground/70">all zones</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Avg. Rating</p>
              <p className="text-xs text-muted-foreground/70">/5.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Types Section */}
      <section className="py-16 lg:py-24 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Workspace Types
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Choose your perfect spot</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Four distinct zones designed for different work styles. All include power, Wi-Fi, and table service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Quiet Zone */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <Headphones className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Quiet Zone</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Silent, focused work with noise-dampening panels and ergonomic seating.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-2xl font-bold">₹60</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <ul className="space-y-1.5">
                  {['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Collaboration Table */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Collaboration Table</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Open shared table ideal for team brainstorming and pair work.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-2xl font-bold">₹70</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <ul className="space-y-1.5">
                  {['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Window Seat */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <Sun className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Window Seat</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Bright natural light with a view — perfect for creative flow.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-2xl font-bold">₹80</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <ul className="space-y-1.5">
                  {['Natural light', 'City view', 'Power socket', 'Cozy corner'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium Desk */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <Crown className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Premium Desk</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Private desk with adjustable standing option and premium amenities.
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-2xl font-bold">₹100</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <ul className="space-y-1.5">
                  {['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Celpin Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Why Celpin
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Everything you need to work, nothing you don't</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Seat Map</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See exactly which seats are free before you arrive. Interactive floor map updates live as people check in and out.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pay by the Hour</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Flexible hourly pricing from ₹60 to ₹100. Daily cap at ₹399 means you never overpay.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Coffee className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Café Pre-Orders</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Add coffee, snacks, or meals to your booking. Everything arrives at your seat — no queue, no interruption.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">QR Digital Check-In</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Book online, get a QR code. Scan at the entrance, your seat is ready. Zero friction, zero wait.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Loyalty Rewards</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Earn credits on every booking. Redeem for free hours, free coffee, and member-only discounts.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Star className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Rate Your Visit</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Help us improve with quick post-visit ratings on Wi-Fi, seating, noise, food, and overall comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              How It Works
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">From booking to working in 4 steps</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold font-display mb-4">01</div>
              <MapPin className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Pick a Seat</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Browse the live floor map and choose your zone and specific seat.</p>
            </div>

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold font-display mb-4">02</div>
              <Clock className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Set Duration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Select 1–6 hours. Add work preferences and café orders.</p>
            </div>

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold font-display mb-4">03</div>
              <QrCode className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Pay & Confirm</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Secure payment with cards and wallets. Get your QR code instantly.</p>
            </div>

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold font-display mb-4">04</div>
              <Coffee className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Scan & Work</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Scan the QR at the entrance. Your seat is ready, coffee is on the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Card */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-card text-card-foreground shadow-lg overflow-hidden border-0 ring-2 ring-primary/20">
            <div className="grid md:grid-cols-2">
              <div className="p-8 lg:p-10">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-primary text-primary-foreground mb-4">
                  Transparent Pricing
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight mb-4">Simple hourly rates. Daily cap. No memberships.</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Pay only for the hours you use. If you work all day, the daily maximum kicks in automatically — so you always know your upper limit before you sit down.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Hourly rates: ₹60 – ₹100 depending on zone</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Daily maximum cap: ₹399 — never pay more</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>No deposit, no membership, no commitment</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Free credits earned with every booking</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => onNavigate('booking')}
                    className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl px-8 gap-2 shadow-sm"
                  >
                    Start Booking <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative min-h-[300px] bg-gradient-to-br from-primary/10 via-accent/30 to-card flex items-center justify-center p-8 border-t md:border-t-0 md:border-l border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Daily Maximum</p>
                  <p className="font-display text-6xl font-extrabold text-primary">₹399</p>
                  <p className="text-sm text-muted-foreground mt-2">unlimited hours, any zone</p>
                  <div className="mt-6 flex justify-center gap-6">
                    <div>
                      <p className="text-2xl font-bold">₹60</p>
                      <p className="text-xs text-muted-foreground">Quiet Zone</p>
                    </div>
                    <div className="w-px bg-border"></div>
                    <div>
                      <p className="text-2xl font-bold">₹100</p>
                      <p className="text-xs text-muted-foreground">Premium Desk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-card/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Loved by Members
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">What our regulars say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                  “Celpin changed how I work. I book a window seat, order a cappuccino, and I’m productive within minutes. The QR check-in is brilliant.”
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">PS</div>
                  <div>
                    <p className="text-sm font-semibold">Priya Sharma</p>
                    <p className="text-xs text-muted-foreground">Freelance Designer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                  “The collaboration tables are fantastic for small team sprints. High-speed Wi-Fi, zero fuss with billing, and great snacks on demand.”
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">RK</div>
                  <div>
                    <p className="text-sm font-semibold">Rahul Kapoor</p>
                    <p className="text-xs text-muted-foreground">Tech Lead</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                  “The ₹399 daily cap makes it an absolute no-brainer for long workdays. Quiet zone is genuinely quiet, and the cold brew is perfection.”
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">AM</div>
                  <div>
                    <p className="text-sm font-semibold">Ananya Mehta</p>
                    <p className="text-xs text-muted-foreground">Content Strategist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
