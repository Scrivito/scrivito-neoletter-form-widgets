import { pseudoRandom32CharHex } from '../../../../src/Widgets/FormStepContainerWidget/utils/pseudoRandom32CharHex';

describe('pseudoRandom32CharHex', () => {

    it('should generate a 32-character hexadecimal string', () => {
        jest.spyOn(require('lodash-es'), 'times').mockReturnValue([...Array(32)]);

        const hexString = pseudoRandom32CharHex();

        expect(hexString).toHaveLength(32);
        expect(/^[a-f0-9]+$/i.test(hexString)).toBe(true);
    });

    it('should generate different strings on multiple calls', () => {
        const hexString1 = pseudoRandom32CharHex();
        const hexString2 = pseudoRandom32CharHex();

        expect(hexString1).not.toEqual(hexString2);
    });
});
