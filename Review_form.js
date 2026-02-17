<script>

  const saveBtn = document.getElementById("saveReviewBtn");


  const hotelSelect = document.getElementById("hotelSelect");

  const overallText = document.querySelector('textarea[name="overall_review"]');


 
  function getSelectedValue(groupName) {
    const checked = document.querySelector(`input[name="${groupName}"]:checked`);
    return checked ? checked.value : "";
  }


  function setSelectedValue(groupName, value) {
    const radio = document.querySelector(`input[name="${groupName}"][value="${value}"]`);
    if (radio) radio.checked = true;
  }


  function getHotelKey(hotelId) {
    return "review_" + hotelId;
  }


  function loadHotelReview(hotelId) {
    const saved = localStorage.getItem(getHotelKey(hotelId));

    if (!saved) {
    
      document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      overallText.value = "";
      return;
    }

    const data = JSON.parse(saved);

    setSelectedValue("cleanliness", data.cleanliness);
    setSelectedValue("service", data.service);
    setSelectedValue("overall", data.overall);
    overallText.value = data.text;
  }

 
  function saveReview() {
    const hotelId = hotelSelect.value;

    if (!hotelId) {
      alert("Please choose a hotel first.");
      return;
    }

    const data = {
      cleanliness: getSelectedValue("cleanliness"),
      service: getSelectedValue("service"),
      overall: getSelectedValue("overall"),
      text: overallText.value
    };

    localStorage.setItem(getHotelKey(hotelId), JSON.stringify(data));

   
    alert("The review was saved successfully!");
  }

  saveBtn.addEventListener("click", saveReview);


  hotelSelect.addEventListener("change", function() {
    loadHotelReview(this.value);
  });

</script>
