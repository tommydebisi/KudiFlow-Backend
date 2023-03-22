const { expect } = require('chai');
const sinon = require('sinon');
const TrackController = require('../../app/controllers/trackController');
const Track = require('../../app/models/Track');

describe('TrackController', () => {
  describe('addIncome', () => {
    it('should return 400 if amount is missing', async () => {
      const req = { body: { description: 'Test income' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await TrackController.addIncome(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: 'Missing Amount' })).to.be.true;
    });

    it('should return 400 if description is missing', async () => {
      const req = { body: { amount: 10 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await TrackController.addIncome(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: 'Missing Description' })).to.be.true;
    });

    it('should create a new income in the track', async () => {
      const req = { body: { amount: 100, description: 'Test income' }, userId: 'user-id' };
      const saveStub = sinon.stub().returnsThis();
      const track = { currentBalance: 0, income: [], totalIncome: 0, totalExpenses: 0, save: saveStub };
      // const getSchemaOneStub = sinon.stub().resolves(track);
      sinon.stub(Track, 'currentBalance').get(() => 0);
      sinon.stub(dbClient, 'getSchemaOne').resolves(track);
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await TrackController.addIncome(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'success' })).to.be.true;
      expect(track.income.length).to.equal(1);
      expect(track.income[0].amount).to.equal(100);
      expect(track.income[0].description).to.equal('Test income');
      expect(track.totalIncome).to.equal(100);
      expect(track.currentBalance).to.equal(100);
      expect(track.save.calledOnce).to.be.true;
      Track.currentBalance.restore();
      dbClient.getSchemaOne.restore();
    });
  });

})
