import { Test } from "@nestjs/testing";

import { FilmsService } from "./films.service";
import { FilmsController } from "./films.controller";

describe("FilmsController", () => {
    let controller: FilmsController;
    let service: jest.Mocked<FilmsService>;

    const createModule = () =>
        Test.createTestingModule({
            controllers: [FilmsController],
            providers: [FilmsService],
        })
            .overrideProvider(FilmsService)
            .useValue({
                findAll: jest.fn(),
                getSchedule: jest.fn(),
            })
            .compile();

    const film = {
        id: "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
        rating: 2.9,
        director: "Итан Райт",
        tags: ["Документальный"],
        title: "Архитекторы общества (mock test)",
        about:
            "Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.",
        description:
            "Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.",
        image: "/bg1s.jpg",
        cover: "/bg1c.jpg",
        schedule: [],
    };

    const scheduleItem = {
        id: "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
        daytime: "2024-06-28T10:00:53+03:00",
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
    };

    beforeEach(async () => {
        const moduleRef = await createModule();
        controller = moduleRef.get(FilmsController);
        service = moduleRef.get(FilmsService);
    });

    it("returns list of films", async () => {
        const items = [film];
        const result = { total: 1, items };

        service.findAll.mockResolvedValue(result);

        await expect(controller.findAll()).resolves.toEqual(result);
        expect(service.findAll).toHaveBeenCalled();
    });

    it("returns schedule for film", async () => {
        const id = film.id;
        const items = [scheduleItem];
        const result = { total: 1, items };

        service.getSchedule.mockResolvedValue(result);

        await expect(controller.getSchedule(id)).resolves.toEqual(result);
        expect(service.getSchedule).toHaveBeenCalledWith(id);
    });
});
