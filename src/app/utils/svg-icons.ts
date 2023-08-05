// https://icomoon.io/app/#/select

import { InjectionToken } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import env from '@env/environment';

export const ICONS = new InjectionToken('ICONS');

export function initIconsFactory(
    icons: string[],
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
) {
    return async () => {
        for (const icon of icons) {
            matIconRegistry.addSvgIcon(
                icon,
                domSanitizer.bypassSecurityTrustResourceUrl(
                    `${env.baseUrl}/assets/icons/${icon}.svg`,
                ),
            );
        }
    };
}
