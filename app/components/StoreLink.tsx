export const APP_STORE_URL = "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";

/*
 * App Store link. `placement` names where on the page it sits, so the
 * app_store_click event in Google Analytics shows which buttons get downloads.
 */
export function StoreLink({ placement, className, children }: { placement: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className={className} data-placement={placement}>
      {children}
    </a>
  );
}
