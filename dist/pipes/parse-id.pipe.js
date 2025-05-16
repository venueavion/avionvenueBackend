"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIdPipe = void 0;
const common_1 = require("@nestjs/common");
let ParseIdPipe = class ParseIdPipe {
    transform(value) {
        const id = parseInt(value, 10);
        if (isNaN(id)) {
            throw new common_1.BadRequestException('ID must be a number');
        }
        return id;
    }
};
exports.ParseIdPipe = ParseIdPipe;
exports.ParseIdPipe = ParseIdPipe = __decorate([
    (0, common_1.Injectable)()
], ParseIdPipe);
//# sourceMappingURL=parse-id.pipe.js.map