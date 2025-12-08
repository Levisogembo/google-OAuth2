import { SetMetadata } from "@nestjs/common"
import { Role } from "src/user/dtos/enums/roles.enum"


export const ROLES_KEY = 'roles'
export const ROLES = (...roles: [Role,...Role[]]) =>SetMetadata(ROLES_KEY,roles)