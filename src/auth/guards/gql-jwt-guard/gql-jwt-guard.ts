import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GqlJwtGuard extends AuthGuard("jwt"){
   getRequest(context: ExecutionContext) {
     const ctx  = GqlExecutionContext.create(context)//transform http context into a graphql context
     return ctx.getContext().req
   }
}
