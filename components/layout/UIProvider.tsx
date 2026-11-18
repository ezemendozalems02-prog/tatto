"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import InviteModal from "@/components/events/InviteModal";

type UI = {
  introDone: boolean;
  setIntroDone: () => void;
  openInvite: () => void;
};

const Ctx = createContext<UI>({ introDone: true, setIntroDone: () => {}, openInvite: () => {} });

export const useUI = () => useContext(Ctx);

export default function UIProvider({ children }: { children: ReactNode }) {
  const [introDone, setDone] = useState(false);
  const [invite, setInvite] = useState(false);
  const setIntroDone = useCallback(() => setDone(true), []);
  const openInvite = useCallback(() => setInvite(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <Ctx.Provider value={{ introDone, setIntroDone, openInvite }}>
        {children}
        <InviteModal open={invite} onClose={() => setInvite(false)} />
      </Ctx.Provider>
    </MotionConfig>
  );
}
