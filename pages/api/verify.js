export default function hanlder(req, res) {
  const { code } = req.body;
  if (!code || code.length !== 6 || code.charAt(5) === "7") {
    return res.status(400).json({ error: "Verification Error" });
  }
  return res.status(200).json({ msg: "Success" });
}
