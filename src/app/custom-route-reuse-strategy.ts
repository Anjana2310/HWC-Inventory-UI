import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};

  routesToBeReuse = []
  // "medicineDispense/View", "storeSelfConsumption/View", "physicalStockEntry/View", "storeStockTransfer/View", "storeStockAdjustment/view", "storeStockAdjustmentDraft/view"

  calcKey(route: ActivatedRouteSnapshot) {
    let next = route;
    let url = "";
    while (next) {
      if (next.url) {
        url = next.url.join('/');
      }
      next = next.firstChild;
    }
    return url;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }

    if (this.routesToBeReuse.includes(this.calcKey(route))) {
      return true;
    }

    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[this.calcKey(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (!sessionStorage.getItem('key')) {
      this.handlers = {};
      return false;
    }
    let url = this.calcKey(route);
    return !!route.routeConfig && !route.routeConfig.loadChildren && !!this.handlers[this.calcKey(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) return null;
    if (route.routeConfig.loadChildren) return null;
    return this.handlers[this.calcKey(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return this.calcKey(curr) === this.calcKey(future);
  }

}