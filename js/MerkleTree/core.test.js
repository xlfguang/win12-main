"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_check_1 = __importDefault(require("fast-check"));
const strict_1 = __importDefault(require("assert/strict"));
const utils_1 = require("ethereum-cryptography/utils");
const core_1 = require("./core");
const bytes_1 = require("./bytes");
const keccak_1 = require("ethereum-cryptography/keccak");
const zero = new Uint8Array(32);
const leaf = fast_check_1.default.uint8Array({ minLength: 32, maxLength: 32 }).map(x => PrettyBytes.from(x));
const leaves = fast_check_1.default.array(leaf, { minLength: 1 });
const leavesAndIndex = leaves.chain(xs => fast_check_1.default.tuple(fast_check_1.default.constant(xs), fast_check_1.default.nat({ max: xs.length - 1 })));
const leavesAndIndices = leaves.chain(xs => fast_check_1.default.tuple(fast_check_1.default.constant(xs), fast_check_1.default.uniqueArray(fast_check_1.default.nat({ max: xs.length - 1 }))));
fast_check_1.default.configureGlobal({ numRuns: process.env.CI ? 10000 : 100 });
describe('core properties', () => {
    it('a leaf of a tree is provable', () => {
        fast_check_1.default.assert(fast_check_1.default.property(leavesAndIndex, ([leaves, leafIndex]) => {
            const tree = (0, core_1.makeMerkleTree)(leaves);
            const root = tree[0];
            if (root === undefined)
                return false;
            const treeIndex = tree.length - 1 - leafIndex;
            const proof = (0, core_1.getProof)(tree, treeIndex);
            const leaf = leaves[leafIndex];
            const impliedRoot = (0, core_1.processProof)(leaf, proof);
            return (0, utils_1.equalsBytes)(root, impliedRoot);
        }));
    });
    it('a subset of leaves of a tree are provable', () => {
        fast_check_1.default.assert(fast_check_1.default.property(leavesAndIndices, ([leaves, leafIndices]) => {
            const tree = (0, core_1.makeMerkleTree)(leaves);
            const root = tree[0];
            if (root === undefined)
                return false;
            const treeIndices = leafIndices.map(i => tree.length - 1 - i);
            const proof = (0, core_1.getMultiProof)(tree, treeIndices);
            if (leafIndices.length !== proof.leaves.length)
                return false;
            if (leafIndices.some(i => !proof.leaves.includes(leaves[i])))
                return false;
            const impliedRoot = (0, core_1.processMultiProof)(proof);
            return (0, utils_1.equalsBytes)(root, impliedRoot);
        }));
    });
});
describe('core error conditions', () => {
    it('zero leaves', () => {
        strict_1.default.throws(() => (0, core_1.makeMerkleTree)([]), /^Error: Expected non-zero number of leaves$/);
    });
    it('multiproof duplicate index', () => {
        const tree = (0, core_1.makeMerkleTree)(new Array(2).fill(zero));
        strict_1.default.throws(() => (0, core_1.getMultiProof)(tree, [1, 1]), /^Error: Cannot prove duplicated index$/);
    });
    it('tree validity', () => {
        (0, strict_1.default)(!(0, core_1.isValidMerkleTree)([]), 'empty tree');
        (0, strict_1.default)(!(0, core_1.isValidMerkleTree)([zero, zero]), 'even number of nodes');
        (0, strict_1.default)(!(0, core_1.isValidMerkleTree)([zero, zero, zero]), 'inner node not hash of children');
        strict_1.default.throws(() => (0, core_1.renderMerkleTree)([]), /^Error: Expected non-zero number of nodes$/);
    });
    it('multiproof invariants', () => {
        const leaf = (0, keccak_1.keccak256)(Uint8Array.of(42));
        const tree = (0, core_1.makeMerkleTree)([leaf, zero]);
        const badMultiProof = {
            leaves: [128, 129].map(n => (0, keccak_1.keccak256)(Uint8Array.of(n))).sort(bytes_1.compareBytes),
            proof: [leaf, leaf],
            proofFlags: [true, true, false],
        };
        strict_1.default.throws(() => (0, core_1.processMultiProof)(badMultiProof), /^Error: Broken invariant$/);
    });
});
class PrettyBytes extends Uint8Array {
    [fast_check_1.default.toStringMethod]() {
        return (0, bytes_1.hex)(this);
    }
}
//# sourceMappingURL=core.test.js.map