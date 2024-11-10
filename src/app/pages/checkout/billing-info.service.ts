import { Injectable } from "@angular/core";
import { BillingInfoModel } from "./billing-info.model";

@Injectable({providedIn: 'root'})
export class BillingInfoService {
    billingInfo: BillingInfoModel = {
        name: '',
        email: '',
        address: '',
        phoneNo: 2024449108,
        description: ''
    }
    shippingInfo: BillingInfoModel = {
        name: '',
        email: '',
        address: '',
        phoneNo: 2024449108,
        description: ''
    }

    constructor() {
        const billingInfo = localStorage.getItem('billingInfo');
        const shippingInfo = localStorage.getItem('shippingInfo');

        if(billingInfo) {
            this.billingInfo = JSON.parse(billingInfo);
        }
        if(shippingInfo) {
            this.shippingInfo = JSON.parse(shippingInfo);
        }
    }
    saveBillingInfo(billingInfo: BillingInfoModel) {
        localStorage.setItem('billingInfo', JSON.stringify(billingInfo));
    }

    getBillingInfo() {
        return this.billingInfo;
    }

    saveShippingInfo(billingInfo: BillingInfoModel) {
        localStorage.setItem('shippingInfo', JSON.stringify(billingInfo));
    }

    getShippingInfo() {
        return this.shippingInfo;
    }
}