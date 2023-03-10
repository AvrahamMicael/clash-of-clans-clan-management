const inputs = Array.from(document.querySelectorAll('td > input'));
const getRole = input => input.parentElement.parentElement.dataset.role;
for(const input of inputs)
{
  input.onchange = async () => {
    let newValue;
    const updateValue = value => {
      newValue = input.value = value;
    };
    switch(input.name)
    {
      case 'a':
        newValue = input.checked;
        break;
      default:
        newValue = input.valueAsNumber;
        if(!input.value || isNaN(newValue) || newValue < 0)
          updateValue(0);
        if(parseInt(newValue) != newValue)
          updateValue(parseInt(newValue));
        if(input.name == 'p' && newValue > 5000)
          updateValue(5000);
    }
    await fetch('/promotions/'+getRole(input), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        property: input.name,
        newValue,
      }),
    })
      .then(async res => {
        if(res.ok) return;
        const data = await res.json();
        console.error(data.msg);
      });
  };
}
