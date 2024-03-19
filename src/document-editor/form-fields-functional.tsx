import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
const FormFields = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string =
        "https://services.syncfusion.com/react/production/api/documenteditor/";
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    let settings =  {showRuler: true};
    const onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            sfdt: "UEsDBAoAAAAIAEKJbVZg7ak4xhsAAJScAAAEAAAAc2ZkdO19567jxrbmqzT2/JkBPRZz8OACVyRFSqQoMYoSLwyDOeegcHDefUrSbrujvbeP29221T96FSuuqpW+qs2i/vVUN0NappfQiILh6YehG8PvnvrQf/rhf/71BGjTPf3wr6fm+PQDiaDfPTXJ0w8UAxJFCRKAds90eKbeMw2i5ukHGNA6vCeS4OkHjPzuKXqmXnrL9sBIT5vwqLpx+AT6j6seZMw710t98Fz5dQEykO+ewvZ4o4U3+LeW95L/+fHfoJMbt93t/zvn95wmujLvBV1/pQNg5F+gdjHcaRffqff8nNzJdCWADu7TD2Ai/VBdOay70i0AQ0UaPZf7t86j/gKqgXogcZ3SLRldU2ASKWgCaqZ3xqJ7/2kJxn2Cn66p6DYTMDEC+x4lbiwQzPcUTF0fplvhBLiuxqIAhT+n3PpWNBz7+xp7d1LcSXcnw40U18X694///hFUfxbme+txXa+n/0WwDMsTggCYSqp7p8UzAczB3wNu+uT23F+l+XYRf2/j28q/Vxl5rvxRVe8/GScIXjxOML64avLimtMLa4KqfXDXjqulITT+PUzAMIzBBEIRFH3NHm7a6H+6+GoLza377vicmID6Ilc1TW+8/CEm8cfawpWju7/5uaF3rfxz3uf6GArA9pNUe2/mTVOkvjukdfVGAGw9fTFNf5G873r9O8f5J2o6SmPXybyr3c9Zv6HRyE3M3V3Mya3Y9br8lkiG54Bzd4TvK8GLZvNqkb/Clb1MRl9YnMiLxYn8ljjje/CJ3dszkErcAeb/52MndRPsVWpe8Snr/N3W+Ko485v2943Y2x8ooLf2VqTVHTW4d1LeyBW/Ed/jd0B3S3j3gqt54iT1PYEzDE0BzMeQNPWOrT7jN3eMhrtZBmHvvwUow/A2BewY5KLXAPQFQ89zYPnxOswfDAN/I+a9H8OQT8Yw5FVxEME/2Qf+uTgohlXYucWbVRVdmbzGwm8iDD7g3YdG+OTFt5ly5AIThNtMo1tOWDbDGTwN935/Nr33I+Nz1nNkRD+L9d6PjCj9PXb1wzBGIzjJUCj10lD59XYGf0cE9cVC7nd/nrP72ce90LG9pP7diQkgWLzZuGX4w1/Nd30TeO4Leaq3fumzXgrFsO+pDwH8c943tCd9ucpex8nvTvHarRmehp9ohvQQhkB+cik8+Al/ulncc+Xo2YFG4c/xOrot4Gdbf/cU3l0vqPB0Zf9Oh/Q291tv5fNBznTb5SbVVQI36fw88iss642w1RVzsTfffMQ4+m7Gu9P+SaxZ18+ffs94N4Y/6hj5TMfPnCCfa/BpATw8xD/BQ3y4x0eJq+Ae2OWBXb4t7MKm3ZC84d3hN8DL4+jpAVX+WKjyq+jjppa8exbSsAh+E3Zg78MOcobOEIaBP4YeH0CF90f5YgDlFf39zPqLQcYHc3iY8ANLPLDEA0t8DSwxD4Iu7PsHkHgAia965gHDUUCitPcTgWDEq888Pmz9yjMPFEW8N6ybh90bY+jCcPjyByCv6O9j7l53mvHR0j4s/YE3HnjjgTe+Bt5Qk7p6HFs80MbXRRtUEOEkDuM/0Z7nvhptfNj6lWjjf6Mw+X8Igvi/GI6g3xTSeJ+z16GMj5b0YeEPlPFAGQ+U8TVQxqJ00+KBMh4o46uiDBRGApihyZ/g4HecaXzY+ne8x/Hffl02bnX+HtBvCmh8xNzrsMZHC/uw8wfWeGCNv+7ljWeVuJPPX9l4iPXvduXjbsTf1NWOF0f+f+Tlj0Uw3q8/usUbbXQBg8/XIZ++zTu/j7uRX+CayGduaPmfKX/tBZJXBPoHuvuDFeJveBhgnpsvecvjD/skAUq+XNU+X/fvvJMggWNhMJohcRrH6I93FR+W/x1OEviubn4iXQyBCdz7yUOI8DUnCZ9s/ZmThOD6PY9/AXJl5mmZxknYgexd/TbggwerSqew60EaGFOf/u4Dhet5Aq9vVX5rb379msivngZ8enH+jNsanzfAPwB3PCydZn7d0j8s/4JnCQ+I8YAYv+XOVlU/pMN4dZMv/6vD5y37ASwewOJPumpKEa6Put5PCMXgr79q+kHrV/6JQkn9JI3d6s0zqkjvgvpm/krxKf5eeZH0w+X9g1zDA4k8kMgDiTyQyCfer+zquHPLMq3iN2u3ikc3DvsHJnlgkm8MkzwC4SMQPgLh3z8Q3v4ifP388leLiJI7uYbfpc3wCIOPMPjX/LRCBnS4v+nwyw7v1bCLQv9aWazr67cYFic/LIqwGj51bv/BwcA7g/3uXfjbs/03/8Hh/rt8PODCAy484MIDLvwJH0QAe+bC7R5Y4YEV/jrvB8AugmN+5P7kRT7x6vcDPmz9BSDGV3o14KN1eeCIB4544IgHjvjyOEIPXf+veOLwz3rn+QErfg1WEHiIhQhF/xSS9OthxYet/z6w4qN1+avBioeRP3DGPxZnvHfr8APf/bGkHz8g9Spx/QoH04vr/tN+ROrHaxy9lfz4zk2/yC368FblOXUPdsg1woFeObdIvS4F3Y73pXu+S3lfqOT+m6XRzdPDz/+enu/6ve3Ze6/vW/xEPoifYK38XypF7nsDR1F1Df/v5byXcfWv/zGMv8r7mUbva4N3VyIXEPpZUb+HKQYhSZKAKQqFGZy65j//Mmn6Np7/Mu38ysjb9LH6OX3076jmCh+i4t4sGI73PcXz78GGVXT35dd3GVX0oMFUuto5Uzmbr6NsNtLsai8pSd7h2BTMIILWCWuXN/lGkZaC51KUSy8O5bCze0kPKFjaq+KZs7JBPIwidV7M9pr2X/91BUrX/vX2IreScG7Ky6714UV8jC7+/FYelff5NXcVD5Lh+SXLKLqb7vVDC88qcga+7G3yhv3e08/nfv4ziX2o4tXplyGuBnVDUWHkjsXwRnU7N+7cJnkj1NVw5wB52/Rt5WXoBtfXmZA/isPf1KkrinTf8X6/olR1cfeOnwTf5Pum+madxsnt26I3q0QF4KXIp19sj/zAwn6p/76dvZP/iez7zxO/43TeXcI3XOJeL/V8SigfVXpHGN/AhD6jMx9yj/5pWvI6JUE/pyTY69YU++JKgr5ESdDPK8nXnNALlQT7RpUE+7Vt/OfXFBEwisSePtgFf1ElwV6iJNjnleRrTuiFSoJ/o0qCf6wkv3y/4QWGl77zuYcvqyT4S5QE/5SSfP0JvVBJiG9USYhPeJKXOOUvqxDESxSC+KTX+FOZf6HwyW9U+OSrhP+Ls/2ywidfInzylcL/Asx/Tvg/Xlf1ul8Hsiju1C/vtHt+PN1pWsY3PYCvJ9qBO7g/pKUbh7Omiv+f5/YhiX+X7titfoRlMa7n4N/GsJKFFYOUfH3mZtz8ACg7elbYXivM9xtDh1fzrsd9Urtm6JVmISyoe8qOE33QrGum5C8Sxz/O56sAPHPL3Vwz/EGCQVcLyrB0drdMQsqB156w2429r597dTXI9spgc6E7LbUT1ypsHasEt9bFxS5c64coFeKiLg4mZ8xlztL7I9cXdj/fnmXEFzhdzg/+1MV2Ia65QmBhf1yudTKbL5K5U5KswVJTYWMG1lWqNYPIC7NdQcxlFqyjqcT6NYMgQ1e5WB9C0CU4pcUyO+GILGS2zNHThmzbduhMhK7YA04zSENzZuMUidNj3sl1xA1BURSmC0qb27xrpCd/mtX4OSr13FE4qZfPpa8tA0WZXH+chZNhW4qmhrLSk745sKRZHU9FZmfeprpAhELq1VEHzysGuTDBbl/jYmLvCmeVlOXFZdkYJnSZR9J6r7bk2J3lgItXOwKGLSsVrUOyvQweqUe5cYaY3WJqRD6tPXUGzSzrbC4Me10gZJGvm6XLMsGIuYGpCGJ72VXS0c+1o1nsgWruoqbCuMqUCkNDS3VYa/BWSA+8vN0QvTJHSZa1S6T3tqf12WTROILz1ofanTuSlsyy5YgdenezSjphc7DFBM6hsw95ytYqG/YC8zG+hY01swmQ+TkTNvEeLtoYbwrRP2xaOcgHayn08SUrVW9AyW0IMkTB78+ZuBlHCEYRYXtGWza1D87pskEwDEdIozh4O+6yVlZUopc7em76LX4cccu067bt5FE1DYMRXbtFr9JUzr628gpt3bZjN4MNFknWOntiaIszMyU41ws9pkOedWPqsBP03awRNTpO+l0MORNKtG5ZSvIp3uKWv6lR6jCU3ZBVWFWWB9LKFmBcYy9mCUJV8XqDuahiALY0eHkJWoxI42U2Lwkrv6S+XyenuRm1bMD56l6Nj6tFKh6CY31aT5Oqbtm4hh2SKZaKvDEmc8T0abM5Hc78KIgzHYYxJFttV5rH7CMt4sFSKCIvn2OHxbhsFpNuB0U2EuxO9aVdiLMdBi9P2SpUNK/QOYbU/WUf4wk77mQurnEprPLkNCLzMd7uh5KBqEA3V2CSLjOX2otzwpmwM7S8Wqw2ZCNZu6XOnPQaKyhpXM29DZihx/jjfp0dKcJQODBnyXQGtNWpotxSSgoyih3rY1FfpIg3Fsp5DeZxcnkCxTyc3oK5a7NYj/c91sEU2VmruszDVEFwlg9alqs7GQ/0erlbDFaoLtOVw0OCmGmEa8Damou7fk/afKrVmDzynkdBDDKdB3IT6yvY6Wv7KsNhV7dGrvPavqzGywmnI/UiMdBk2tRsQil7UkpeyPIq32lpPOPVuegVZkpvl3xEOnMfdsXDmlwukR3UMXSAyQneDUIvZT4mzNCosSGGCRzF6A+lHIw1NIumCuZYoi0yBUc32aFvYJXx0FbgWUJU+J18tqxhbTBLehDOKHADM6vv5tRey9FicRZb3a9xPFIpUpr3iIqc2FpdLhqvM4KuPopyYNcH2gW2RYIxnKK6EIzOyZZnY7LOCYXY2X23PU2CmIRBrdd7+bTWaZfbqe0mHZ18d540ZmhKp3Rlh5M1uUZlolTXFHAODrJx5+HUb5f7FhFKi+f4YxZ1NE1D2Whmej50LloxRs23lFKzFrS6tl0DF8NAtqttjRYJ6Jl60U0pYdeNvseyhDU1VUI7vUPo2W47LKT6HM9gR6AptmhgMtDFJhEVZ5Yu+S6JYW/fBrm0TvSaSgaUcjt5C89P2CJenZYHvcekc1jwcegkO2SkwTy6DBFjP7zIxtxALd0f7NosD4vpshU2XidAs1niy45xXCqJzHqBzkAzN9mayS4lQVnX6vPBonJnsWLEjZWRM86Bi91Ot1s/NGko2gCHquXxRORtD/P85XKcAf1Xc3KxExx7VvecZ8/WV7+a2to8tmeWMKYnfAYdspC3Fxt3sGe+yQbNFkWXfFIDT7xIHb2xTrysrtUo8nuyWRdnoq6yGrUQx2YAv4wK2Wm2rQvJtS+tOIkWYvSFOMgcPlZNui+oIKZHUzpV+/3+ENlweDkT/pTMgw1g5YCQq2he8sFUTdmKUQwmnAXbZslUe+BTzlPMAf0WBeAvlI6ci8T+xAL/l3HADt/1o3oRHVeYDK1ky92YMKNqom8RIB4SSLC3pnLdH3HNIC3N34hgzY+Wd8TrfhKa0mLXjh7NqkIgaShNJDzFx3U+I8k5LgyIEESRvt/Ezp6m1qq6bD2YPYD89a4DjBP91kj1wxDWM22n7elzErp6n1EkKStpZJWxiO2Lc7NPG3FTr9OqyhKY6tOEMS1iyxdnrzXd2uadxJRgcghnh97emLtKwdjVqjAID24qfrcnk0MxLQju5I/e0jyPntpTWxC3oWjrucY0GSYddJq0Pp73tF5QzHghvGMD76nuzAzDtIHJSE2wIVpvdNGU8pQ/j5tqpefTgmWEDD1Mao9gwgk4z51+joFNeJ4HQdVC3DQ1fExNzpVaF5qWMMpSXYhDimaaeAKfrvpCW8u1t9O97KRIeUkQkrSGVXS3WG4uPgNlGVcdk9R2pK0KQVf1jtfBjjpYEqF2SIt4NBwJcERTuZ2ooq7GvFWfz5pNZudzoIgi1++BxyimxkVGRbz4Y3GUt66x36WOug01klasvOTM5EL0F1XYZlBsEMFYGLlDnpyedCq7aF0/G/VM2ROjpHmcqSQVfyLoKpc37CzaYhQNqVsLTU+HXmG3Oe36iq2KlSzMBxIB2G8Ps8uYz6tlhZbjpEfKKlk6qpKdWoRLCl4EnhpX92v6tCRC1/Nw58J5YVq3q0tjTzEuSScngKDIWsyWheVBPSqQ+TaXkEO6wDviiAZNuK+I5TkJ5lpoZ9xwIWhC8I/pwgHAatXZh4092lYCjZC1DYT5MdhOWsw6pyqFNbex1bi+juFvRd6Ot9pOXJsXinB4WGibYLMtgIwma8U6bdeJqnZYy9JcwXgEcfa7I1Rmi8a0EGXishQ4e5jZ26ahTdtZBctOgE+lfAy31vywViCiRzuzcbUaFi5Qx5HNMFRqdUllc1l1Z0mlFvJsM/m+vOAiKB7msG/yEtDrHl0bCrZhImwHXJXrIR5MbSqTMmfOHuPb3bby2mDuopm+KWPNNg5bZBPtHUSOZwGUUkgKYg6IeGI8rIOa4w1+fZqHMEWMxQnDAnkJfKy0yHCnXTAsFyfCytuu4nyBblAq6BBJ27sM7EiGlQtNALHuRd2xyX6tdIslFfl2fJTc8iJUl+SsAycmHMzViZDHaapabz4iWE2Jp15nitU6S5JkisUcRbSVfTbFEwtQeo15I3aWOQAlVfykBxElcwqXnm1HXK3RMeKOvBAf5/wJSgu3vczbdpHaqS4So1fU0Wwqkz26lLc9kml1m+fwasSiiZkmx6r0eeCv4phxOlWd+v68GqxDx2X8tN8vlU1ZB9OgCtBQSJ1YJOVFysCGRx5sO5bkhtvI8AJfTvvT6UTPzLKScpiGRifhWnM3M1bbbV8SpoFwrCccG9koWH/Gedt2Th6Mdg6WHGbZ/erU7OVzXsMsBTVzsjbZhlidTpcoDMPgdI6zed3ni6PoJsTMmgeWNIcZXqOVQVA6d4uZ9WFdQI3BK+N6c9XpWmfgfCQOMPBwgUkuLRBsIrVshljgbe9U68N60eOXhcBqFi9LOqPandUuGaOJOxnK4SzOXNsxTyXJgC0jT3vsEffxhYvMRbg/Y6kS+pqmNLs5eQpE9paXKPsCD9F+xu3m8rA/xc9jLP1WQWNG63/u8xqfQJ9r61jCUSksYMU9Z4rf7yncp+wgkeulvcaPK7RIbdpJAGzq2IIMZCPvcNujBVfcOKdSgaAxzlA5kyJpX4sy12MXLb2WsRPPsidaaWCeMsiYb5NtyfWdWxOoYZ3zVX4sMmab6XhOw2jhDyQALclKXDIJQ3cXupPp6VxsG1lzUoUbGrXP2nhbLmMyIJkt0mL+4SqQuM9LLecTmBRUW5b42Wy2VK05GU3j2I+2CswTwBpgz8G49IxFocVnEoDIQG/13BWNRY96w/mgA9mgGYKMA33kFbVdCqNdzyUH4N6hwVhEW+65IwBM0ASTySVudRvgwLUxOWA7HVhOCNbcdHYc657xVu5b4AuAWWer0wHgjsEAeGwJjzx7QZjIroATdpOdwOqepHjAJDEu7tfCSRBNM7ZHgFURUrd2C/mI6qkhmZ0xt0WwQ3IxXa8zC9iEvOgX2KRFSbCHWMURJBPhzAEhU93gSAs3OU/kWWCCWwxz6s2R7PNEw735oOWemLRjs9E4PuWlm09BJnjth9ulMyhx4OT7ZVUUhoxY2mGV4zkPAJaqwjLLdJBeOfAAt3RNEiLM6s28qPPIVWkMgsqqmpFruJyBMeIomrJEcAw0nm8kpVpyyuq0XaVrAsfpGdVGMGtj3lDvugXfMkVHny0pUZbXcXfRYrfjtVnA9qaFbpCyWizwgnABnF8eFmJe7lNzRYdqwDPwtus6CoIScwXQliMxm20F0OA1oPiWJEn8NoVc1bZtFNdL+1jThB5MADIbil/PcU+S5gQc4Ybnr9p1Sm7CYUKbhsANUmsKmOec02o95id+GrfbrXfOzbj3MstW/XG5SPeuoiw51ww3PFNPWVEg0FgfjmvMa5AYU1YB2FeXxorR9Jw2uYOkbGgTwdYjts5TNYzi40Fxth3D2swZ98PNzAJmM7GCJOXV6kLPIg1fjjWejeh6manyLuOTI56LxIlLV52gXXhXHCBSS+AVJSmLagmMIZ9ZLrAxfwDLCCAM38DukhB0y4KiYCafHQVEq3xY++iMWq/XdOxvl/OkC7wLsN1BSAbeQjh9pm7qU2f6hmYcJNEUUp0HULmjDWICsI+2kGaxWk1INm0Yhqax6ETB+ErUspXEL8vTHjbdQtDhaLRWFhixtDKAWUMgD9eQHMkHmBuDd/aJMsVzTM9mwtwf9BkH1KvaIMs5tQN7hcDxyHMxzI+h6SxPi3BfEuGqN7ADFMo8Ze+FwkEPI7QbwY7N2Papyw4wx52zBU2EM6+fwTuKQrDlAeAC2yPO+NaUCgJV67UR8+yqXJxZgMdQzAYe+BL1iXyeuuQ8jqOy0lh6vjrZaiCiEE0fAoRkPOYg4m4Rdq07aEA7cNy3V2VjOsfFohQ5V4SmCZ/JO27aCovbOUe44jyVFna7nSUUi4J1ykMJjN10aNKHdLA61Xxu+AfGXc9cZWgQbVSFca9WUrGoaWzbCG2iFdVCRVtoO23LsoS1UpBHtQT7uohf2YJrHU3lIFTYDIL83nLXEEm3AOMkYPskaSC+ik0b5oaRD3FtmNmy0yN1t6CZDDkTSpJAWTuqqqlp2Bxad9ZC8OPzul3MENSv4TVYObDlhsZ8c65iloB4iwL/umxT6CKnS1uFdZlwHPboqiomsNnYbqoMoYiB3yv2sro0WLrZBTh6JhVu0xyKUuw1HstQFuwlVHEqWPawUvLjIqoQBKGXlstBvqEsPCNbK5KDR26ahNq5izspKefnbA7VwebcxpmtOVLa8uxxBmXzNZKd1c3mZI39EqMCoGOonl+cQteV+rjtV6FvCxtzgXXtklaOJ3Fn4opr8Ox2tzgH22hBslAeAZhPUiZ1KZescEBECUDOyqgaY22YTczDe1PlunWZLDI9TQVt5elstFP1NYgr0xQWcwAIc6RDDXeRb1dgSicrBI4l2TdL3y8Nacdocgtw+NnLNZYgl9lOnS37C1FVaWBrh+WOnzb8QENLTufGg75TOrRJxZjXDeA3u6bhZ53ibA67lvC5/bhMVLOBj8EgYyNrAKtauywI/UuKgZgJ0s4bY1+4IQqUKEOwTcSsxasfJKGM25Ydt/KMwR72A7tcD3mrrqyd2LhuSQxLsJ0No41Hb2qPhKJUvsIXQS6IGbKab5oVgc9mGIaCfTttrEg/lBa5noy7wZPPZ2i2l7Xhsu23qOSGjoqySraW/Plq3LTVru7O9H593GRQm5WNa0vZigSkOOmmPOdOHU1LpdGhJZPEhJ9qbrJATuqMwg8QbBose8wWyYhS3sDlTTWpVVlCkhVjbLwpbWRONvtGCQvVSJna447KUk2O9X7TnOXcY3LLmi5OBG03G/zi9GhQwVOIbpdmbYmOqMcHP6BtWbA5elNiEG+iILioKB9j3u0sfVEIZm6MWslxTz/++9//H1BLAQIUAAoAAAAIAEKJbVZg7ak4xhsAAJScAAAEAAAAAAAAAAAAAAAAAAAAAABzZmR0UEsFBgAAAAABAAEAMgAAAOgbAAAAAA==",
        };
        // tslint:enable
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = "Form Fields";
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    };
    const rendereComplete = (): void => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.documentEditor.pageOutline = "#E0E0E0";
        container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(
            document.getElementById("documenteditor_titlebar"),
            container.documentEditor,
            true
        );
        onLoadDefault();
    };
    return (
        <div className="control-pane">
            <div className="control-section">
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        id="container"
                        ref={(scope) => {
                            container = scope;
                        }}
                        style={{ display: "block" }}
                        height={"590px"}
                        serviceUrl={hostUrl}
                        enableToolbar={true}
                        showPropertiesPane={false}
                        locale="en-US"
                        documentEditorSettings={settings}
                    />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrate the design and fill legacy form fields(text,
                    check box, and drop down).To unprotect the document, use password
                    '123'.
                </p>
            </div>
            <div id="description">
                <p>In this example you can find legacy form fields.</p>
                <ul>
                    <li>Text form field</li>
                    <li>Check box form field</li>
                    <li>Drop down field</li>
                </ul>
                <p style={{ display: "block" }}>
                    {" "}
                    More information about the document editor features can be found in
                    this{" "}
                    <a
                        target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/document-editor/form-fields/"
                    >
                        documentation section.
                    </a>
                </p>
            </div>
        </div>
    );
}
export default FormFields;
