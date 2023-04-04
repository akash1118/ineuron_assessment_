/**
 * @author: Akash Verma
 * @purpose : Sample Crude App for SDE-1 Assessment 
 */


import { Request, Response, json } from 'express';
import { ItemModel, ItemDocument } from './itemSchema';

// Function to generate API Response
let generate = async (error: boolean, msg: string, data: Array<any>| null ) =>{
  let resobj = {
    error: error,
    message: msg,
    data: data
  }
  return resobj
}


// Function to create Items

export const createItem = async (req: Request, res: Response) => {
    try {
      const { name, description, price } = req.body;
  
      const newItem: ItemDocument = new ItemModel({
        name,
        description,
        price,
      });
  
      await newItem.save();
      
      let apiResponse = await generate(false, 'Item Added Successfully', [newItem])
  
      res.status(201).send(apiResponse);
    } catch (error) {
      console.error(error);
      let apiResponse = await generate(true, 'Server error', null)
      res.status(500).send(apiResponse);
    }
  };


  // Function to update Item

  export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
  
    try {
      let apiResponse
      const updatedItem = await ItemModel.findOneAndUpdate(
        { _id: id },
        { name, description, price },
        { new: true }
      );
      if (!updatedItem) {
        apiResponse = await generate(false, 'Item not found', null)
        return res.status(404).send(apiResponse);
      }
      apiResponse = await generate(false, 'Item updated Successfully', [updatedItem])
      return res.status(201).json(apiResponse);
    } catch (err) {
      console.error(err);
      let apiResponse = await generate(true, 'Server error', null )
      res.status(500).send(apiResponse);
    }
  };


  // Function to get Item

  export const getItem = async (req: Request, res: Response) => {
    try {
        const items = await ItemModel.find();
        let apiResponse
      if (!items) {
        apiResponse = await generate(false, 'Item not found', null)
        return res.status(404).send(apiResponse);
      }
      apiResponse = await generate(false, 'Item Fetched Successfully', [items])
      res.status(200).json(apiResponse);
    } catch (err) {
      console.error(err);
      let apiResponse = await generate(true, 'Server error', null)
      res.status(500).send(apiResponse);
    }
  };

// Function to get Item by id

  export const getItemByID = async(req: Request, res: Response) =>{
    try{
        const items = await ItemModel.findById(req.params.id)
        let apiResponse
        if(!items){
          apiResponse = await generate(false, 'Item not found', null)
          return res.status(404).send(apiResponse);
        }
        apiResponse = await generate(false, 'Item Fetched Successfully', [items])
        res.status(200).json(apiResponse)
    }catch(err){
      console.error(err);
      let apiResponse = await generate(true, 'Server error', null)
      res.status(500).send(apiResponse);
    }
  }

// Function to delete Item by id

  export let deleteItemById = async(req: Request, res: Response) =>{
    try{
        const itemdata = await ItemModel.findById(req.params.id)
        const deleteItem = await ItemModel.findByIdAndDelete(req.params.id)
        let apiResponse
        if(!deleteItem){
          apiResponse = await generate(false, 'Item not found', null)
          return res.status(404).send(apiResponse);
        }
        apiResponse = await generate(false, 'Item Deleted Successfully', [itemdata])
        res.status(200).send(apiResponse)
    }catch(err){
      console.error(err);
      let apiResponse = await generate(true, 'Server error', null)
      res.status(500).send(apiResponse);
    }
  }
