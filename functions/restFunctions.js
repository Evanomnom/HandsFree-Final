export const insertMenu = async (rest, url, name) => {
    const toSend = {"url":url, "menu":rest, "name": name}
    //send the url and menu through the post call
    const res = await fetch("/api/menuSettings/insertMenu", {
      method: 'POST',
      body: JSON.stringify(toSend),
    })
    //console.log(toSend) console log for testing
    if (res.status === 200) {
      return true
    } else {
      return false
    }
  };

//just in case the contacts collection name changes, change it here
export const addContact = async (name, email, phone) => {
  const toSend = {"phone":phone, "email":email, "name": name, "collection": "_handsfree_contacts"}
  const res = await fetch("/api/addContact", {
    method: 'POST',
    body: JSON.stringify(toSend),
  });
  return (res.statusText == "OK");
};