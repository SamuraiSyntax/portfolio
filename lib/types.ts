export type Network = {
  name: string;
  icon: string;
  url: string;
};

export type CardType = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  action: {
    type: "link" | "external-link" | "modal" | "contact" | "options";
    href?: string;
    modalId?: string;
  };
};
