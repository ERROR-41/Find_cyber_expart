import { useState } from "react";
import {
  Users,
  Shield,
  DollarSign,
  CircleCheckBig,
  CheckCircle,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react";
// Import the icon components
import { useEffect } from "react";

const Person = () => {
  const [specialists, setSpecialists] = useState([]);
  const [budget] = useState(10000000);
  const [selectedTeam, setSelectedTeam] = useState(() => {
    const savedTeam = localStorage.getItem('selectedTeam');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || "specialists";
  });

  // Save to localStorage whenever selectedTeam or activeTab changes
  useEffect(() => {
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const apiFetchData = async () => {
    try {
      const res = await fetch("exparts.json");
      const jsonData = await res.json();
      setSpecialists(jsonData);
    } catch (error) {
      console.log("fatching Erorr data :", error);
    }
  };

  useEffect(() => {
    apiFetchData();
  }, []);

  const addToTeam = (specialist) => {
    if (!selectedTeam.find((s) => s.id === specialist.id)) {
      setSelectedTeam([...selectedTeam, specialist]);
    }
  };

  const removeFromTeam = (seciallistId) => {
    setSelectedTeam(selectedTeam.filter((s) => s.id !== seciallistId));
  };

  const totalCost = selectedTeam.reduce(
    (sum, specialists) => sum + specialists.salary,
    0
  );

  const remainingBudget = budget - totalCost;

  const getSecurityLevel = () => {
    const teamCount = selectedTeam.length;
    if (teamCount >= 6)
      return {
        lavel: "MAXIMUM",
        color: "text-green-400",
        bg: "bg-green-500/10 border-green-500/30",
      };
    if (teamCount >= 5)
      return {
        lavel: "HIGH",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/30",
      };
    if (teamCount >= 3)
      return {
        lavel: "MEDIUM",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-500/30",
      };
    if (teamCount >= 2)
      return {
        lavel: "BASIC",
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/30",
      };
    return {
      lavel: "VULNERABLE",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/30",
    };
  };

  const securityLevel = getSecurityLevel();

  return (
    <div className=" w-full mx-auto px-4 py-6 bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Toggle button start here */}
      <div className="flex max-w-7xl mx-auto flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("specialists")}
          className={`flex-1 px-6 cursor-pointer py-5 rounded-xl font-semibold transition-all text-center border-2 flex items-center justify-center ${
            activeTab === "specialists"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-blue-500"
              : "bg-slate-700/50 text-gray-200 hover:bg-slate-600/50 border-slate-600 hover:border-slate-500"
          }`}
        >
          <Users className="w-6 h-6 mr-2" />
          <span className=" text-lg font-monospace">Available Specialists</span>
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`flex-1 px-6 py-5 cursor-pointer rounded-xl font-semibold transition-all text-center border-2 items-center justify-center ${
            activeTab === "team"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-blue-500"
              : "bg-slate-700/50 text-gray-200 hover:bg-slate-600/50 border-slate-600 hover:border-slate-500"
          }`}
        >
          <Shield className="w-6 inline h-6 mr-2" />
          <span className=" text-lg font-monospace">
            Your Team ({selectedTeam.length})
          </span>
        </button>
      </div>
      {/* Toggle button end here */}
      {/* Dashboard visibility card  */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border-2 border-slate-600/50 hover:border-slate-500/50  transition-all">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500/20 p-3 rounded-full">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <p className="text-gray-300 text-lg font-medium">
                Remaining Budget
              </p>
              <p className="text-xl font-bold text-green-400">
                ${remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border-2 border-slate-600/50 backdrop-blur-xl hover:border-slate-500/50 transition-all p-6 ">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Users className="w-8 h-8 text-blue-400 " />
            </div>
            <div>
              <p className="text-gray-300 text-lg  font-medium">Team size</p>
              <p className="text-xl font-bold text-blue-400">
                {selectedTeam.length}/{specialists.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border-2 border-slate-600/50 backdrop-blur-2xl hover:border-slate-500/50 p-6 transition-all">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-full">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-300 text-lg font-medium">
                Total Investment
              </p>
              <p className="text-purple-400 text-xl font-bold">{totalCost}</p>
            </div>
          </div>
        </div>
        <div
          className={`${securityLevel.bg} p-6 border-2  rounded-xl  transition-all`}
        >
          <div className="flex sp`ce-x-4 items-center">
            <div className="bg-red-500/20 p-3 rounded-full">
              <CircleCheckBig className={`h-8 w-8 ${securityLevel.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-300">Security Lavel</p>
              <p className={`text-xl font-bold ${securityLevel.color}`}>
                {securityLevel.lavel}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard visibility card  end here */}
      {/* Content card start */}
      {activeTab === "specialists" && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {specialists.map((specialist) => {
            const isHired = selectedTeam.find((s) => s.id === specialist.id);
            const canAfford = remainingBudget >= specialist.salary;

            return (
              <div
                key={specialist.id}
                className={`bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border-2 transition-all hover:shadow-xl hover:shadow-blue-500/10 ${
                  isHired
                    ? "border-green-500/70 shadow-green-500/20 bg-green-500/5"
                    : canAfford
                    ? "border-slate-600/50 hover:border-blue-500/50"
                    : "border-red-500/50 opacity-70 bg-red-500/5"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={specialist.img}
                      alt={specialist.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    />
                    {isHired && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {specialist.name}
                    </h3>
                    <p className="text-blue-300 font-semibold text-sm mb-3">
                      {specialist.designation}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{specialist.age} years old</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{specialist.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-400">
                          ${specialist.salary.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">Annual Salary</p>
                      </div>
                      <button
                        onClick={() =>
                          isHired
                            ? removeFromTeam(specialist.id)
                            : addToTeam(specialist)
                        }
                        disabled={!canAfford && !isHired}
                        className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all border-2 ${
                          isHired
                            ? "bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-md"
                            : canAfford
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-blue-500 shadow-md"
                            : "bg-gray-700 cursor-not-allowed text-gray-400 border-gray-600"
                        }`}
                      >
                        {isHired
                          ? "Remove"
                          : canAfford
                          ? "Hire"
                          : "Too Expensive"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {activeTab === "team" && (
        <div className="space-y-6">
          {selectedTeam.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-12 max-w-md mx-auto backdrop-blur-sm">
                <AlertTriangle className="w-20 h-20 text-red-400 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold text-red-400 mb-4">
                  No Team Members Hired!
                </h3>
                <p className="text-gray-300 text-lg">
                  Your server is still vulnerable. Hire specialists to secure
                  it.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-7xl text-white mx-auto bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border-2 border-slate-600/50">
                <h3 className="text-3xl font-bold mb-6 text-center">
                  🛡️ Your Security Team
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">
                      Total Investment
                    </p>
                    <p className="text-2xl font-bold text-green-400">
                      ${totalCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Team Members</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {selectedTeam.length}
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Security Status</p>
                    <p className={`text-2xl font-bold ${securityLevel.color}`}>
                      {securityLevel.lavel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedTeam.map((specialist) => (
                  <div
                    key={specialist.id}
                    className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border-2 border-green-500/50 hover:border-green-500/70 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={specialist.img}
                          alt={specialist.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                        />
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white">
                          {specialist.name}
                        </h4>
                        <p className="text-blue-300 font-medium">
                          {specialist.designation}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-300 mt-2">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{specialist.age}y</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{specialist.address}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-400">
                          ${specialist.salary.toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromTeam(specialist.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm mt-2 transition-all border border-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Person;
