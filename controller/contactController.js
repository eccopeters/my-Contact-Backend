import asyncHandler from "express-async-handler";
import Contact from "../model/contactModel.js";

const getAllContact = asyncHandler(async (req, res) => {
  const userid = req.user.id;

  const contacts = await Contact.find({ userid });
  res.json({ contacts });
});

const getContact = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const contactid = req.params.id;

  const contact = await Contact.find({ _id: contactid });

  if (contact.userId === userId) {
    res.status(200).json({ contact });
  }else{res.status(401);
  throw new Error("Not authorized to view contact");}
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const userid = req.user.id;

  const contact = await Contact.create({
    userid,
    name,
    email,
    phone,
  });
  res.status(200).json({ contact });
});

const editContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  const { username, email, phone } = req.body;
  const userid = req.user.id;

  const contact = await Contact.find({ _id: contactId });
  if (contact.userid === userid) {
    UpdateContact = await Contact.updateOne(
      {
        username,
        email,
        phone,
      },
      { new: true }
    );
    res.status(200);
    res.json();
  } else {
    res.status(401);
    throw new Error("Unauthorized Access");
  }
});

const deleteContact = asyncHandler(async (req, res)=>{
    const contactId = req.params.id
    const userid = req.user.id

    const contact = await Contact.find({_id: contactId})

    if(contact.userid !== userid){
        res.json(401)
        throw new Error("Unauthorized Access")
    }
    const deletedContact = await Contact.deleteOne({_id: contactId})
    res.status(200)
    res.json(deletedContact)
})


export {getAllContact, getContact, addContact, editContact, deleteContact}