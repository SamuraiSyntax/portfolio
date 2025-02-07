export const neobrutalism = {
  base: `
    border-2 
    border-foreground/20
    transition-all 
    duration-200 
    ease-in-out
  `,
  hover: `
    hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]
    group-hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]
    hover:translate-x-[-4px]
    group-hover:translate-x-[-4px]
    hover:translate-y-[-4px]
    group-hover:translate-y-[-4px]
    hover:border-foreground
    group-hover:border-foreground
  `,
  active: `
    active:translate-x-[0px] 
    active:translate-y-[0px] 
    active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]
  `,
  variants: {
    primary: `
      hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]
      group-hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]
      hover:border-primary
      group-hover:border-primary
    `,
    secondary: `
      hover:shadow-[4px_4px_0px_0px_hsl(var(--secondary))]
      group-hover:shadow-[4px_4px_0px_0px_hsl(var(--secondary))]
      hover:border-secondary
      group-hover:border-secondary
    `,
  },
};

// Combine tous les styles en une seule classe
export const neobrutalismClass = `
  ${neobrutalism.base}
  ${neobrutalism.hover}
  ${neobrutalism.active}
`;

export const neobrutalismClassPrimary = `
  ${neobrutalism.base}
  ${neobrutalism.variants.primary}
  ${neobrutalism.active}
  hover:translate-x-[-4px]
  hover:translate-y-[-4px]
  group-hover:translate-x-[-4px]
  group-hover:translate-y-[-4px]
`;

export const neobrutalismClassSecondary = `
  ${neobrutalism.base}
  ${neobrutalism.variants.secondary}
  ${neobrutalism.active}
  hover:translate-x-[-4px]
  hover:translate-y-[-4px]
  group-hover:translate-x-[-4px]
  group-hover:translate-y-[-4px]
`;
