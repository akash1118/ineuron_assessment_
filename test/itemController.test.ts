import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { ItemModel } from '../itemSchema';

chai.use(chaiHttp);
const expect = chai.expect;


describe('POST /items', () => {
  it('should create a new item', async () => {
    const newItem = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 10.99
    };
    const res = await chai.request(app).post('/items').send(newItem);
    expect(res.status).to.equal(201);
    expect(res.body.data[0]).to.have.property('name').equal(newItem.name);
    expect(res.body.data[0]).to.have.property('description').equal(newItem.description);
    expect(res.body.data[0]).to.have.property('price').equal(newItem.price);
    const createdItem = await ItemModel.findOne({ name: newItem.name });
    expect(createdItem).to.exist;
  });
});

describe('getItem function', () => {
  it('should get all items', async () => {
    const res = await chai.request(app).get('/getitems');
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('should return an error message if no items are found', async () => {
    // Insert any necessary data before running the test case
    const res = await chai.request(app).get('/getitems');
    if (!Array.isArray(res.body.data)) {
      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal(false);
      expect(res.body.message).to.equal('Item not found');
    }
  });
});

describe('getItem by Id function', () => {
  it('should get all items', async () => {
    const res = await chai.request(app).get('/getitembyId/642c50326478172468fa282c');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });

  it('should return an error message if no items are found', async () => {
    // Insert any necessary data before running the test case
    const res = await chai.request(app).get('/getitembyId/642c50326478172468fa282c');
    if (!Array.isArray(res.body.data)) {
      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal(false);
      expect(res.body.message).to.equal('Item not found');
    }
  });
});

describe('updateItem function', () => {
  it('should update an item successfully', async () => {
    const item = {
      name: 'Updated Item Name',
      description: 'Updated Item Description',
      price: 10.99
    };
    const res = await chai
      .request(app)
      .put('/updateitems/642c50326478172468fa282c')
      .send(item);
    expect(res).to.have.status(201);
    expect(res.body.error).to.equal(false);
    expect(res.body.message).to.equal('Item updated Successfully');
    expect(res.body.data[0]).to.have.property('name').equal(item.name);
    expect(res.body.data[0]).to.have.property('description').equal(item.description);
    expect(res.body.data[0]).to.have.property('price').equal(item.price);
  });

  it('should return an error if item is not found', async () => {
    const item = {
      name: 'Updated Item Name',
      description: 'Updated Item Description',
      price: 10.99
    };
    const res = await chai
      .request(app)
      .put('/updateitems/642c50326478172468fa2828')
      .send(item);
    expect(res).to.have.status(404);
    expect(res.body.error).to.equal(false);
    expect(res.body.message).to.equal('Item not found');
    expect(res.body.data).to.be.null;
  });

  it('should return an error if server encounters an error', async () => {
    const item = {
      name: 'Updated Item Name',
      description: 'Updated Item Description',
      price: 10.99
    };
    const res = await chai
      .request(app)
      .put('/updateitems/545411111w45r53r5fex')
      .send(item);
    expect(res).to.have.status(500);
    expect(res.body.error).to.equal(true);
    expect(res.body.message).to.equal('Server error');
    expect(res.body.data).to.be.null;
  });
});