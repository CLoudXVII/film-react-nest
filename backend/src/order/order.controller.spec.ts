import { Test } from "@nestjs/testing";

import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

describe("OrderController", () => {
    let controller: OrderController;
    let service: jest.Mocked<OrderService>;

    const moduleFactory = () =>
        Test.createTestingModule({
            controllers: [OrderController],
            providers: [OrderService],
        })
            .overrideProvider(OrderService)
            .useValue({
                create: jest.fn(),
            })
            .compile();

    const orderPayload = {
        email: "test@test.ru",
        phone: "+7(000)000-00-00",
        tickets: [
            {
                film: "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
                session: "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
                daytime: "2024-06-28T10:00:53+03:00",
                row: 3,
                seat: 5,
                price: 350,
            },
        ],
    };

    const expectedResult = {
        total: 1,
        items: orderPayload.tickets,
    };

    beforeEach(async () => {
        const moduleRef = await moduleFactory();
        controller = moduleRef.get(OrderController);
        service = moduleRef.get(OrderService);
    });

    it("creates order", async () => {
        service.create.mockResolvedValue(expectedResult);

        await expect(controller.create(orderPayload)).resolves.toEqual(expectedResult);
        expect(service.create).toHaveBeenCalledWith(orderPayload);
    });
});
