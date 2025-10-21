import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout-component/layout-component';
import { MedicComponent } from './pages/medic-component/medic-component';
import { PatientComponent } from './pages/patient-component/patient-component';

// CORRECCIÓN: La ruta de importación debe ser el nombre completo del archivo TS.
import { ProductComponent } from './pages/product-component/product-component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'pages/medic', component: MedicComponent },
            { path: 'pages/patient', component: PatientComponent },
            // La declaración de la ruta en sí está bien, el problema era solo el import de arriba.
            { path: 'pages/product', component: ProductComponent }
        ]
    }
];