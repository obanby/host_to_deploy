// NPM
const Loggy = require("@elbanby/loggy");
// Custom
const Auth = require("../../../helpers/auth/Auth");
const HostDAO = require("../../../db/mongo/host/DAO");
const jsonR = require("../../../helpers/response");

function getAll(req, res) {
  HostDAO
    .getAll()
    .then(hosts => {
      if (hosts.length !== 0) {
        hosts = hosts.map(h => {
          h = h.toObject();
          delete h.login.password;
          return h;
        });
      }
      jsonR(res, 200, null, hosts)
    })
    .catch(err => jsonR(res, 500, err, null))
}

async function signup(req, res) {
  let {
    email,
    name,
    password,
    age,
    bio,
    phone
  } = req.body;

  if (!email || !password) {
    jsonR(res, 403, "Must provide valid email and password", null);
    return;
  }

  try {
    let host = await HostDAO.getByEmail(email);
    if (host) {
      jsonR(res, 400, "email already exists please login", null);
      return;
    }

    password = await Auth.hash(password);

    await HostDAO.create({
      name,
      profile: {
        name,
        age,
        bio
      },
      contact: {
        emails: email,
        phone,
      },
      login: {
        email,
        password
      }
    });
    jsonR(res, 200, null, "user added");
  } catch (err) {
    Loggy.error("Error occurred retrieving host by email", err, __filename);
    jsonR(res, 500, err, null);
  }
}

async function login(req, res) {
  let {
    email,
    password
  } = req.body;

  if (!email || !password) {
    jsonR(res, 403, "Must provide valid email and password", null);
    return;
  }

  try {
    let host = await HostDAO.getByEmail(email);

    if (!host) {
      jsonR(res, 400, "user doesn't exist please signup", null);
      return;
    }

    let isValidPassword = await Auth.comparePassword(password, host.login.password);

    if (!isValidPassword) {
      jsonR(res, 403, "Unauthorized user. Activity reported.", null);
      return;
    }

    let jwt = await Auth.sign({
      email: host.login.email,
      id: host._id
    });

    host = host.toObject();
    delete host.login.password;
    jsonR(res, 200, null, {
      jwt,
      host
    });
  } catch (err) {
    Loggy.error("Error occurred retrieving host by email", err, __filename);
    jsonR(res, 500, err, null);
  }
}

async function editProfile(req, res) {
  // These are the only updateable fields as of now.
  const {
    bio,
    country,
    city,
    languages,
    field
  } = req.body;

  if (!bio || !country || !city || !languages || !field) {
    jsonR(res, 403, "Must provide bio, country, city, language, field", null);
    return;
  }

  try {
    let decoded = await Auth.verify(req.headers.jwt);
    let host = await HostDAO.getById(decoded.id);

    // Host doesn't exist and should not update profile
    if (!host) {
      jsonR(res, 403, "User doesn't exist, can't create event", null);
      return;
    }


    let hostUpdatedProfile = await HostDAO.update(decoded.id, {bio, country, city, languages, field});
    hostUpdatedProfile = hostUpdatedProfile.toObject();
    delete hostUpdatedProfile.login.password;
    jsonR(res, 200, null, hostUpdatedProfile);

  } catch (err) {
    Loggy.error("Error occurred retrieving host by email for editProfile", err, __filename);
    jsonR(res, 500, err, null);
  }

}

module.exports = {
  signup,
  getAll,
  login,
  editProfile
};
