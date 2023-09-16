import * as SV from "../services";
export const registerCT = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        err: -1,
        mes: "Mising input!",
      });
    const response = await SV.register({ name, email, password });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Failed at sv!",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        err: -1,
        mes: "Mising input!",
      });

    const response = await SV.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Failed at sv!",
    });
  }
};
