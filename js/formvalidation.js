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
    this.populateSelect();//populate Select options
  }
  start() {
    this.handleForm();//Form Submit
  }

  /*
  ** Populate the Select options with given Data
  */
  populateSelect() {
    const select = document.querySelector('select[name="status"]');
    if (!select) {
        console.error('Select element not found.');
        return false;
    }
    oppoStatus.forEach(({ K_OPPO_STATUS, SUCCESS, STATUS }) => {
        const option = new Option(STATUS, K_OPPO_STATUS);
        option.dataset.success = SUCCESS;
        select.add(option);
    });
  }//Eof Method(onFormSubmit)

  /*
	** Add dynamic Form Submission Event 
	*/
	handleForm(){
		const form =  document.querySelector('form') || document.getElementsByTagName('form')[0];
    if (!form) {
        console.error('Form element not found.');
        return false;
    }

		form.addEventListener("submit", FormComponent.onFormSubmit);//attaching submition event		
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