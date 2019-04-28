import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class View extends React.Component {

  constructor() {
    super()
    this.state = { markdown: "" }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({markdown: blogs[id]})
  }

  render() {
    const markdown = this.state.markdown
    const { classes } = this.props;
    return (
        <Grid container spacing={24}
          direction="column"
          alignItems="center">
          <Grid item xs={6}>
            <ReactMarkdown className={classes.paper} source={markdown} />
          </Grid>
        </Grid>
    );
  }

}


const blogs = {
  "greatest-blog": 
  `# Annis imago

  ## Ululatibus oviumque detur pluviaque Dorceus solebat sceleratum
  
  Lorem markdownum simus; fontis cursu, cacumine ab aversata supremum quam
  ramumque coniectos cinxisse verbis medios. Contempsere lentum prosternite virum
  in egi quid, auxiliaris incepto caeruleo, prodamne pontus tu aureae mortale.

  ![testimage](https://cdn-images-1.medium.com/max/1600/0*3CxuIsmcqiCW40Ez.png)
  
  1. Cetera aedes
  2. Senex gramina respondit
  3. Sub hiems colentes undis vox inmensa probat`,
  "microservices": 
  `# Carpebam mansit frondentis tacuit

  ## Decerpserat mox cum et nomen
  
  Lorem markdownum! De adhuc meis aurum. Virgo intumui Philomela **ab** fas
  colorque: depositura stimulis dirae vetustos, sed. Aquarum sit ore viro gladios
  nobis: *nate aether* velit congelat Anaxaretes
  [Liber](http://www.ante.com/clausas).
  
      hyper_site.yahooDcim.schema_view_address(570655,
              oasisPharmingPlug.digitize_ftp_isp(11, ssl.kindle(copyright_file, 4,
              hdd_public_illegal)));
      if (unc / exploit_design - hardware) {
          exbibyte_point_safe.appleUserKde(3 + rootkitDrag,
                  extranetMac.encoding_hard_interface(-1));
          flood_dpi_kilohertz += impressionPetabyte(650895, nicNum,
                  disk_floppy.solid_web(cybersquatter_refresh_page));
      } else {
          urlTftpSrgb.station_system_crm(-5, flowchart, handle);
          alignment += webmail(5);
          wiAppletSerial.keystroke += 3;
      }
      rwInDrive = epsVersion + sdk_enterprise + gpsStatusShortcut + rtfDay(java,
              1, integerFile);
      if (kvm == threading_matrix_leaderboard) {
          smm_deprecated = volumeBarebones;
      } else {
          system_keystroke_unmount(kilobit_lion.ups(crm_cybercrime));
          tokenBarebonesMinicomputer.ntfs(ansiUser,
                  facebookUnfriend.digital_saas_api.window(dlcRtBurn),
                  ebook_ospf_olap(3));
          tutorial_torrent = endBusDocument;
      }`,
  "kubernetes": 
  `# Praelata poeniceas ducis

  ## Ensis tum montis iam
  
  Lorem markdownum frater, Dodonaeo si tunc arboris vanum aquarum salutent.
  Placebant colorem. **Terrae ripae perarantem** spolioque mutando; quaedam
  inmotaeque solvit, ad. Componar cura leves, Propoetides nulla subiecit me orbem
  et ignes! Sinu niveo, dare quibus agnoscis loci, me vobis.
  
      podcastPhreakingPebibyte.networking_captcha_video +=
              vaporware_client.mnemonicDmaEmulation(-2 - multitasking_office) +
              icmp_active_view;
      if (bittorrentVirusRecursion + clob + 35 + agp_netiquette) {
          requirements_on += vrmlVirusWindows.ddr_wrap_vlog.cc_page(file_sip,
                  core_nanometer);
          heuristic.boot(secondaryUat * 132612, rawDnsPlug.adapter_sample(
                  services_standalone_boot, kbpsUrlData), halftonePublishing);
          desktopFpuCad += 13;
      }
      var open_sync_remote = card_web - moodleLun(storage +
              commerce_e_biometrics);
      hardAddressIeee = illegal_flash_computer.jquerySoLeak.motion_analyst(
              function_compression_google, 4) + driveEnd(latency) + copy;
      browser_device.delete_linkedin_rpc -= power_memory;`
}

export default withStyles(styles)(View);
