import { Response } from "express";

const formatResponse = (response: Response, routeResp: any): Response<any, Record<string, any>> =>
{
    return response.status(routeResp.httpCode || 200).send(routeResp.data);
};

/**
 * Safeguard a REST call response to prevent uncaught errors and handle
 * errors returned by microservices.
 */
export function RouteResponse()
{
    return ( _target: unknown, _key: string, descriptor: any ): any =>
    {
        const originalMethod = descriptor.value;

        descriptor.value = async function ( ...iArguments: Array<any> ): Promise<any>
        {
            const response: Response = this.httpContext?.res;

            let routeResp: any;

            try
            {
                const method = originalMethod.apply(this, iArguments);

                routeResp =  method instanceof Promise
                    ? await method
                    : method;

                return formatResponse(response, routeResp);
            }
            catch (error)
            {
                return response.status(500).send(error);
            }
        };

        return descriptor;
    };
}
