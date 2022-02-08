/*
Let instance = Firecracker.reactive(HelloComponent).mount('#widget');
instance.render(['abc', 'def'])

let HelloComponent = func() {
  return { render: render };

  function render(items) {
    return _("ul")._(
      items.map(itemText => {
        return _("li").t(itemText);
      })
    );
  }
}
*/
