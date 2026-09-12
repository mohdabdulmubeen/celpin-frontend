import React, { useState, useEffect } from 'react';
import {
  Coffee,
  DoorOpen,
  Headphones,
  Users,
  Sun,
  Crown,
  CheckCircle2,
  XCircle,
  Clock,
  Wifi,
  ArrowRight,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { Seat, ZoneInfo } from '../types';

interface FloorMapPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const FloorMapPage: React.FC<FloorMapPageProps> = ({ onNavigate }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [, setZones] = useState<Record<string, ZoneInfo>>({});
  const [stats, setStats] = useState({ total: 15, available: 11, occupied: 3, reserved: 1 });
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  useEffect(() => {
    api.getSeats().then(data => {
      setSeats(data.seats);
      setZones(data.zones);
      setStats(data.stats);
    });
  }, []);

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'occupied') {
      return 'border-destructive/40 bg-destructive/10 text-destructive/50 cursor-not-allowed';
    }
    if (seat.status === 'reserved') {
      return 'border-warning/40 bg-warning/10 text-warning/70 cursor-not-allowed';
    }
    // Available colors by zone
    switch (seat.zone) {
      case 'quiet':
        return 'border-chart-2/50 bg-chart-2/15 text-chart-2 hover:scale-110 cursor-pointer';
      case 'collaboration':
        return 'border-chart-4/50 bg-chart-4/15 text-chart-4 hover:scale-110 cursor-pointer';
      case 'window':
        return 'border-chart-3/50 bg-chart-3/15 text-chart-3 hover:scale-110 cursor-pointer';
      case 'premium':
        return 'border-chart-1/50 bg-chart-1/15 text-chart-1 hover:scale-110 cursor-pointer';
      default:
        return 'border-primary/50 bg-primary/15 text-primary hover:scale-110 cursor-pointer';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
          Live Floor Map
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Café Floor Map</h1>
        <p className="mt-2 text-muted-foreground">See real-time availability. Tap an available seat to view details and book.</p>
      </div>

      {/* Live Badge Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl bg-card border border-border shadow-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success"></span>
          </span>
          <span className="text-sm font-medium">Live · updates automatically</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-success/80"></span> Available ({stats.available})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/60"></span> Occupied ({stats.occupied})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-warning/70"></span> Reserved ({stats.reserved})
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visual Map Layout */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Map Canvas */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-accent/30 via-muted/20 to-card rounded-t-xl overflow-hidden p-4">
              <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

              {/* Entrance Marker at Bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <DoorOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Entrance</span>
              </div>

              {/* Café Counter Marker at Top */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shadow-xs pointer-events-none">
                <span className="text-xs text-primary font-semibold flex items-center gap-1.5">
                  <Coffee className="h-3.5 w-3.5" /> Café Counter
                </span>
              </div>

              {/* Zone Labels */}
              <div style={{ left: '15%', top: '8%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-2 uppercase tracking-wide whitespace-nowrap pointer-events-none">
                Quiet Zone
              </div>
              <div style={{ left: '47%', top: '12%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-4 uppercase tracking-wide whitespace-nowrap pointer-events-none">
                Collaboration
              </div>
              <div style={{ left: '80%', top: '8%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-3 uppercase tracking-wide whitespace-nowrap pointer-events-none">
                Window Seats
              </div>
              <div style={{ left: '50%', top: '62%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-1 uppercase tracking-wide whitespace-nowrap pointer-events-none">
                Premium Desks
              </div>

              {/* Render All Seats */}
              {seats.map(seat => {
                const isSelected = selectedSeat?.id === seat.id;
                return (
                  <button
                    key={seat.id}
                    disabled={seat.status !== 'available'}
                    onClick={() => setSelectedSeat(seat)}
                    style={{ left: `${seat.coordinates.x}%`, top: `${seat.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 text-xs font-bold transition-all shadow-sm ${getSeatColor(
                      seat
                    )} ${isSelected ? 'ring-4 ring-primary ring-offset-2 scale-110 z-20' : ''}`}
                  >
                    {seat.name}
                    {seat.status === 'available' && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success border-2 border-card"></span>
                    )}
                    {seat.status === 'occupied' && (
                      <XCircle className="h-3.5 w-3.5 text-destructive mt-0.5" />
                    )}
                    {seat.status === 'reserved' && (
                      <Clock className="h-3.5 w-3.5 text-warning mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Zone Legend Footer */}
            <div className="p-4 border-t border-border bg-card/60">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-2/15 text-chart-2">
                    <Headphones className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-muted-foreground">Quiet Zone (₹60)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-4/15 text-chart-4">
                    <Users className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-muted-foreground">Collaboration (₹70)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-3/15 text-chart-3">
                    <Sun className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-muted-foreground">Window Seat (₹80)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-1/15 text-chart-1">
                    <Crown className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-muted-foreground">Premium Desk (₹100)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seat Inspector Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card shadow-sm sticky top-24 p-6">
            <h3 className="font-semibold tracking-tight text-lg">Seat Details</h3>
            <p className="text-sm text-muted-foreground mb-4">Tap an available seat on the map</p>

            {selectedSeat ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-accent/40 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold font-display text-primary">{selectedSeat.name}</span>
                    <p className="text-xs text-muted-foreground font-medium uppercase mt-0.5">{selectedSeat.zone} Zone</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold">₹{selectedSeat.hourlyRate}</span>
                    <span className="text-xs text-muted-foreground block">/hour</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm text-card-foreground leading-relaxed">{selectedSeat.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Amenities Included</h4>
                  <ul className="space-y-1.5">
                    {selectedSeat.amenities.map((am, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                        {am}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('booking', { selectedSeatId: selectedSeat.id, selectedZone: selectedSeat.zone })}
                    className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-2 shadow-sm transition-colors"
                  >
                    Book Seat {selectedSeat.name} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4 text-muted-foreground">
                  <Info className="h-7 w-7" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Select an available seat (green indicator) on the floor map to preview its amenities and book it.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
              <Wifi className="h-4 w-4 text-success" />
              <span>Fast Wi-Fi available throughout the café</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
