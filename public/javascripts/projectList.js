const stopBtn = document.querySelectorAll("button.stop");
const contest_names = document.querySelectorAll(".contest_name");
const durations = document.querySelectorAll("td.duration");
const fields = document.querySelectorAll("td.field");
const hosts = document.querySelectorAll("td.host");

stopBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    const contest_name = contest_names[index].innerText;
    const duration = durations[index].innerText;
    const field = fields[index].innerText;
    const host = hosts[index].innerText;

    try {
      const result = await axios.post("/stopCon", {
        contest_name,
        duration,
        field,
        contest_host,
      });
      if (result.data) {
        alert(result.data);
      }
      location.href = "/";
    } catch (error) {
      console.error(error);
    }
  });
});

const participateBtn = document.querySelectorAll("button.participate");
const non_contest_names = document.querySelectorAll("td.non_contest_name");
const non_durations = document.querySelectorAll("td.non_duration");
const non_fields = document.querySelectorAll("td.non_field");
const non_contest_hosts = document.querySelectorAll("td.non_contest_host");

