var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Ubicación: src/infraestructure/entities/Barrio.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let Barrio = class Barrio {
    id_bar;
    nam_bar;
    cor_sur;
    cor_nor;
    cor_ori;
    cor_occ;
    ind_seg;
    porcentaje;
};
__decorate([
    PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], Barrio.prototype, "id_bar", void 0);
__decorate([
    Column({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Barrio.prototype, "nam_bar", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Barrio.prototype, "cor_sur", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Barrio.prototype, "cor_nor", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Barrio.prototype, "cor_ori", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Barrio.prototype, "cor_occ", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Barrio.prototype, "ind_seg", void 0);
__decorate([
    Column({ type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", String)
], Barrio.prototype, "porcentaje", void 0);
Barrio = __decorate([
    Entity({ name: "barrio" })
], Barrio);
export { Barrio };
//# sourceMappingURL=Barrio.js.map