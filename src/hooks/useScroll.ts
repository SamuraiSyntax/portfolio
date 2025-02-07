export const handleScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const isMobile = window.innerWidth < 768;

    const excludedIds = ["contact", "projets", "services"];
    // Ajouter automatiquement le suffixe "-mobile" si on est sur mobile
    const mobileTargetId =
      isMobile && !excludedIds.includes(targetId)
        ? `${targetId}-mobile`
        : targetId;

    const elem = document.getElementById(mobileTargetId);

    elem?.scrollIntoView({ behavior: "smooth" });
  }
};
