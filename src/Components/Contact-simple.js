import React, { Component } from 'react';

class Contact extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var city = this.props.data.address.city;
      var country = this.props.data.address.country;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
        <div className="contact-simple-wrapper">
          <div className="simple-contact">
            <h4>Email and Phone</h4>
            <p className="address">
              {name} <br />
              <span>{phone}</span>
              <br />
              <a href={`mailto: ${email}`}>{email}</a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
