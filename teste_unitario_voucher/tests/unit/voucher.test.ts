import voucherRepository from '../../src/repositories/voucherRepository';
import * as voucherService from '../../src/services/voucherService';
import * as errorUtils from '../../src/utils/errorUtils';

const voucherDataMock = {
    id: 1,
    code: "a random string",
    discount: 50,
    used: false
}

const appliedMock = {
    amount: 120,
    discount: 50,
    finalAmount: 60,
    applied: true || false
};

describe("test voucherServices", () => {
    it("Success on voucher creation", async () => {
        jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce(null);
        jest.spyOn(voucherRepository, "createVoucher").mockResolvedValueOnce(null);

        await voucherService.default.createVoucher(voucherDataMock.code, voucherDataMock.discount);

        expect(voucherRepository.createVoucher).toBeCalledTimes(1);
    });

    it("Fails if voucher is created with an existing string", async () => {
        jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce(voucherDataMock);
        
        const result = await voucherService.default.createVoucher(voucherDataMock.code, voucherDataMock.discount);

        expect(result).rejects.toEqual(errorUtils.conflictError('Voucher already exist.'));
    });

    it("Applies correctly a valid voucher", async () => {
        jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce(voucherDataMock);
        jest.spyOn(voucherRepository, "useVoucher").mockResolvedValueOnce({...voucherDataMock, used: true});

        const result = await voucherService.default.applyVoucher(voucherDataMock.code, appliedMock.amount);

        expect(result).toEqual(appliedMock);
    });

    it("Fails if voucher code does not exist", async () => {
        jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce(null);

        const result = await voucherService.default.applyVoucher(voucherDataMock.code, appliedMock.amount);

        expect(result).rejects.toEqual(errorUtils.conflictError('Voucher does not exist.'));
    });
});