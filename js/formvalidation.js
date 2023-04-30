const oppoStatus = [
  {
    "K_OPPO_STATUS": 1,
    "STATUS": "1. Initial Contact",
    "SUCCESS": 0
  },
  {
    "K_OPPO_STATUS": 2,
    "STATUS": "2. Demonstration",
    "SUCCESS": 25
  },
  {
    "K_OPPO_STATUS": 3,
    "STATUS": "3. Proposal",
    "SUCCESS": 50
  },
  {
    "K_OPPO_STATUS": 4,
    "STATUS": "4. Negotiation",
    "SUCCESS": 75
  },
  {
    "K_OPPO_STATUS": 5,
    "STATUS": "5. Order",
    "SUCCESS": 100
  }
];

const FormComponent = class {
   
  constructor() {
    this.selectbox  = document.querySelector('select[name="status"]') || document.getElementsByName('status')[0];
    this.inputbox   = document.querySelector('input[name="success"]') || document.getElementsByName('success')[0];
    this.form       = document.querySelector('form') || document.getElementsByTagName('form')[0];

    this.populateSelect();//populate Select options
  }

  start() {
    this.bindElements();// Bind select to input
    this.handleForm();//Form Submit
  }

  /*
  ** Populate the Select options with given Data
  */
  populateSelect() {

    if (!this.selectbox) {
        console.error('Select element not found.');
        return false;
    }

    oppoStatus.forEach(({ K_OPPO_STATUS, SUCCESS, STATUS }) => {
                                                  const option = new Option(STATUS, K_OPPO_STATUS);
                                                  option.dataset.success = SUCCESS;
                                                  this.selectbox.add(option);
                                              });
    this.inputbox.value = this.selectbox.options[this.selectbox.selectedIndex].dataset.success;//default
  }//Eof Method(onFormSubmit)

  /*
	** Dynamic populating of select options
	*/
	bindElements(){
	
		const binding_obj ={};

    if (!this.selectbox || !this.inputbox) {
      console.error('Input or select element not found.');
      return false;
    }

		FormComponent.bindingObjects({from: this.selectbox, to:this.inputbox}, binding_obj);
		
		this.selectbox.addEventListener("change", (eve)=>{ 
													console.log(eve.target.value);
													binding_obj.value=eve.target.options[eve.target.selectedIndex].dataset.success;
													});
		
		
	}//Eof Method(bindElements)

  /*
	** binding two elements(oneway)
	*/
	static bindingObjects(bind_elements, bind_obj){

		Object.defineProperty(bind_obj, 'value', {
          set(new_val){
            bind_elements.to.value = new_val;
          }
        });
		
		console.log(bind_obj);
		
	}//Eof Method(bindOneWay)


  /*
	** Add dynamic Form Submission Event 
	*/
	handleForm(){
    if (!this.form) {
        console.error('Form element not found.');
        return false;
    }

		this.form.addEventListener("submit", FormComponent.onFormSubmit);//attaching submition event		
	}//Eof Method(handleForm)
	
	/*
	** Form Manipulations
	** Static so that in future can be used  without invoking/creating object
	*/
	static onFormSubmit(event) {
		event = event || window.event;
		event.preventDefault();
		
		const data 			= new FormData(event.target);
		const dataObject 	= Object.fromEntries(data.entries());
		const output 		= document.getElementsByClassName("output")[0];
		const output_text	= document.createElement('p');
		
		output_text.innerText = JSON.stringify(dataObject);
		output.textContent = '';//will be faster than innerHTML as browsers won't invoke their HTML parsers 
		output.appendChild(output_text);
	}//Eof Method(onFormSubmit)

}//Eof class(FormComponent)

const fc = new FormComponent();
fc.start();