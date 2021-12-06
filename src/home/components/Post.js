import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Post = ({ registerInputs, setRegisterInputs, setOpen }) => {
  const setModalOpen = setOpen;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let roadAddress = data.roadAddress;
    let jibunAddress = data.jibunAddress;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setRegisterInputs({
      ...registerInputs,
      postcode: data.zonecode,
      road_address: data.roadAddress,
      jibun_address: data.jibunAddress,
      extra_Address: extraAddress
    });
    setModalOpen(false);
  }
  
  return (
    <DaumPostcode
      onComplete={handleComplete}
    />
  );
}

export default Post;