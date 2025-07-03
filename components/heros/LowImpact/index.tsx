import React from "react";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
    }
  | {
      children?: never;
    };

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">{children}</div>
    </div>
  );
};
