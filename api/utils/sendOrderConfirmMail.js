import createMailTransporter  from "./createMailTransporter.js";

 const sendOrderConfirmMail = async (orders, buyer, seller) => {
    const transporter = await createMailTransporter();

    



//send mail
const mailOptionsBuyer = {
    from: `prettygigs  <chuks4flourish@gmail.com>`,
      to: buyer.email, 
      subject: "New Order Processing",
      
      html: `<p> Hello ${buyer.username}, thank you for you order.
       </p>
       <p> Your transaction reference is: ${orders.tx_ref}
       </p>`,

    };

    const mailOptionsSeller = {
        from: `prettygigs  <chuks4flourish@gmail.com>`,
          to: seller.email, 
          subject: "New Order",
          
          html: `<p> Hello ${seller.username}, you have received an order from ${buyer.username}</p>
           
          <p> Login to see order details: <a href="${process.env.CLIENTLINK}">Login</a></p>`
,
    
        };

  // Send emails one by one with a slight delay
  try {
    await transporter.sendMail(mailOptionsSeller);
    console.log("Order confirmation sent to seller");

    // Introduce a slight delay before sending the next email
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await transporter.sendMail(mailOptionsBuyer);
    console.log("Order confirmation sent to buyer");
  } catch (error) {
    console.log(error);
  }


};

export default sendOrderConfirmMail;

