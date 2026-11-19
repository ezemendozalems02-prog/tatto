import { l } from "@/lib/i18n";

/**
 * SISTEMA DE RESERVAS — CONFIGURACIÓN DEMO
 *
 * No hay base de datos: la disponibilidad se calcula en el navegador
 * con estas reglas. Todo es ficticio y editable.
 * Las solicitudes NO confirman turnos: se envían por WhatsApp para que
 * el artista confirme.
 */

export const bookingConfig = {
  /** Días de la semana con atención. 0 = domingo … 6 = sábado. */
  workingDays: [2, 3, 4, 5, 6],

  /** Horarios por defecto. */
  slots: ["10:00", "11:30", "14:00", "16:00", "17:30"],

  /** Horarios especiales por día de la semana (opcional). */
  slotsByWeekday: {
    6: ["11:00", "13:00", "15:30"],
  } as Record<number, string[]>,

  /** Días mínimos de anticipación para solicitar. */
  minNoticeDays: 2,

  /** Cuántos meses hacia adelante se puede navegar. */
  monthsAhead: 4,

  /** Fechas bloqueadas puntuales (YYYY-MM-DD): viajes, feriados, eventos. */
  blockedDates: ["2026-12-24", "2026-12-25", "2026-12-31", "2027-01-01"] as string[],

  /** Rangos bloqueados (por ejemplo, viaje proyectado a Japón). */
  blockedRanges: [{ from: "2027-03-01", to: "2027-03-31", reason: "Viaje internacional (a confirmar)" }],

  /**
   * Simulación de agenda ocupada: porcentaje aproximado de días
   * laborables que se muestran "completos" (determinístico por fecha).
   */
  demoBusyRatio: 0.22,

  /** Simulación de horarios ocupados dentro de un día disponible. */
  demoBusySlotRatio: 0.25,
};

export const otherConsultation = {
  slug: "other",
  name: l("Otra consulta", "Other inquiry", "Outra consulta"),
};
