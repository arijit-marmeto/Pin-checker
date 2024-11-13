        var currentPage = 1;
        const otpInputs = document.querySelectorAll('.otp-input');
        const confirmOtpInputs = document.querySelectorAll('.otp-input-confirm');

        otpInputs.forEach((input, index) => {
            input.addEventListener('input', function () {
                if (this.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
                const otp = Array.from(otpInputs).map(input => input.value).join('');
                const confirmOtp = Array.from(confirmOtpInputs).map(input => input.value).join('');
                const submitBtn = document.querySelector('.submit-btn');
                const same = document.querySelector('.same');
                if(otp!='' && confirmOtp!='' && otp===confirmOtp){

                same.style.display='block';
                    submitBtn.classList.remove('btn-disabled');
                }else{
                    submitBtn.classList.add('btn-disabled');
                    same.style.display='none';
                }
                console.log(otp,confirmOtp);
            });

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
            input.addEventListener('keydown', function (e) {
    // Allow numbers (0-9), backspace, and tab keys
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  });
        });
        confirmOtpInputs.forEach((input, index) => {
            
            input.addEventListener('input', function () {
                if (this.value.length === 1 && index < confirmOtpInputs.length - 1) {
                    confirmOtpInputs[index + 1].focus();
                    
                    
                }
                if(index==5){
                    const otp = Array.from(otpInputs).map(input => input.value).join('');
                    const confirmOtp = Array.from(confirmOtpInputs).map(input => input.value).join('');
                    const submitBtn = document.querySelector('.submit-btn');
                    const same = document.querySelector('.same');

                    if(otp===confirmOtp){
                    same.style.display='block';
                    submitBtn.classList.remove('btn-disabled');
                    }else{
                        submitBtn.classList.add('btn-disabled');
                        same.style.display='none';
                    }
                    console.log(otp,confirmOtp);
                    
                    

                }
                
            });

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    confirmOtpInputs[index - 1].focus();
                }
            });
            input.addEventListener('keydown', function (e) {
    // Allow numbers (0-9), backspace, and tab keys
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  });
  console.log(index);
  
        });

        document.getElementById('otp-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const otp = Array.from(otpInputs).map(input => input.value).join('');
            const confirmOtp = Array.from(confirmOtpInputs).map(input => input.value).join('');
            console.log(otp,confirmOtp);

            if (otp.length === 6 && confirmOtp.length==6 && otp === confirmOtp) {
                currentPage += 1;
                const firstPage = document.querySelector('.first-page');
                const secondPage = document.querySelector('.second-page');
                secondPage.style.display='flex';
                firstPage.classList.add('fade-out');
                if(currentPage==2){
                    btn = document.querySelector('.bar2');
                    btn.classList.remove('btn-disabled');
                    const bacBtn = document.querySelector('.back-icon');
                        bacBtn.style.display="block";
                        const page = document.querySelector('.current_page');
page.textContent=currentPage;
                }
        
        setTimeout(() => {
            secondPage.classList.add('fade-in');
            firstPage.style.display='none'
        }, 500);  

                getPincodeData(otp)
                otpInputs.forEach(input => input.value = '');
                confirmOtpInputs.forEach(input => input.value = '');
                otpInputs[0].focus();
            } else {
                alert('Please enter all 6 digits of the OTP');
            }
        });

        async function getPincodeData(pincode) {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();

                console.log(data);

                if (data[0].Status === "Success") {
                    const cardTitle = document.querySelector('.card-title');
                    
                    const pincodeDetails = data[0].PostOffice[0];
                    console.log(pincodeDetails);
                    cardTitle.textContent = pincodeDetails.Name;
                    if(pincodeDetails.DeliveryStatus==="Delivery"){
                        const stat = document.querySelector('.delivery');
                        stat.style.display = 'block';
                    }else{
                        const stat = document.querySelector('.nodelivery');
                        stat.style.display = 'block';

                    }
                    console.log('Pincode:', pincodeDetails.Pincode);
                    console.log('Place Name:', pincodeDetails.Name);
                    console.log('District:', pincodeDetails.District);
                    console.log('State:', pincodeDetails.State);
                } else {
                    const cardTitle = document.querySelector('.card-title');
                    const cardDesc = document.querySelector('.card-description');
cardDesc.textContent = ''; 
                    cardTitle.textContent = 'No data found for this pincode'
                    console.log('No data found for this pincode');
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }

            
        }
        
const backIcon = document.querySelector('.back-icon');

backIcon.addEventListener('click', function() {
    
    const firstPage = document.querySelector('.first-page');
    firstPage.style.display="block";

    const secondPage = document.querySelector('.second-page');
    firstPage.classList.remove('fade-out'); 
     
    firstPage.classList.add('fade-in');  

    secondPage.classList.remove('fade-in');  
    secondPage.classList.add('fade-out');  

    const same = document.querySelector('.same');
    same.style.display='none';
    const submitBtn = document.querySelector('.submit-btn');

                    submitBtn.classList.add('btn-disabled');
                    btn = document.querySelector('.bar2');
                    btn.classList.add('btn-disabled');
                    setTimeout(() => {
                        const bacBtn = document.querySelector('.back-icon');
                        bacBtn.style.display="none";
                        secondPage.style.display="none";

                        
                    }, 0);
currentPage = 1;
const page = document.querySelector('.current_page');
page.textContent=currentPage;


});
